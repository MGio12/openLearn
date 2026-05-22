#!/usr/bin/env python3
"""Extract Première spé math sources from lien/premiere/math.md to clean markdown.

Pipeline per source:
  1. Crawl4AI extraction (PDF strategy for .pdf URLs, default for HTML).
  2. DeepSeek cleanup pass to rebuild LaTeX formulas (KaTeX-ready).
  3. Write to prototypes/cours/_extracted/premiere/math/<NN-chapter>/<slug>.md.
  4. Manifest at the root of that tree tracks every URL with status.

Usage:
  source .venv/bin/activate
  python scripts/extract_premiere_math.py             # full run, resumable
  python scripts/extract_premiere_math.py --dry-run   # parse only, no fetch
  python scripts/extract_premiere_math.py --only 04-derivation
  python scripts/extract_premiere_math.py --no-clean  # skip DeepSeek pass
  python scripts/extract_premiere_math.py --force     # re-extract ok ones
"""
from __future__ import annotations

import argparse
import asyncio
import json
import os
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
LINKS_FILE = ROOT / "lien" / "premiere" / "math.md"
OUTPUT_ROOT = ROOT / "prototypes" / "cours" / "_extracted" / "premiere" / "math"
MANIFEST_PATH = OUTPUT_ROOT / "manifest.json"

CHAPTER_SLUGS = {
    1: "01-second-degre",
    2: "02-trigonometrie",
    3: "03-produit-scalaire",
    4: "04-derivation",
    5: "05-probabilites-conditionnelles",
    6: "06-fonctions-trigonometriques",
    7: "07-suites",
    8: "08-exponentielle",
    9: "09-variables-aleatoires",
    10: "10-geometrie-reperee",
}

HOST_KEYS = {
    "maths91.fr": "maths91",
    "maths-et-tiques.fr": "mathsettiques",
    "xymaths.fr": "xymaths",
    "chingmath.fr": "chingmath",
    "parfenoff.org": "parfenoff",
    "mathgm.fr": "mathgm",
    "lyceedadultes.fr": "lyceedadultes",
    "meilleurenmaths.com": "meilleurenmaths",
    "mathsguyon.fr": "mathsguyon",
    "annales2maths.com": "annales2maths",
    "tableauxmaths.fr": "tableauxmaths",
    "jybaudot.fr": "jybaudot",
    "mathoutils.fr": "mathoutils",
    "vdouine.net": "vdouine",
}

SYSTEM_PROMPT = """Tu reçois du markdown brut extrait d'un cours de mathématiques de lycée français (Première spécialité). Le texte peut être bruyant : formules mal reconnues, sauts de ligne aléatoires, fragments de mise en page PDF, caractères Unicode mathématiques épars.

Ta tâche : reconstruire un markdown propre et fidèle, sans ajouter de contenu inventé. Règles strictes :

1. Toutes les formules en LaTeX KaTeX-ready : \\( ... \\) inline, \\[ ... \\] bloc. Jamais $...$, jamais d'unicode ², √, ⇒ quand un symbole LaTeX existe.
2. Structure : titres ## pour les sections, ### pour les sous-sections, listes pour les propriétés/étapes, blockquotes pour les définitions et théorèmes énoncés.
3. Notations stables dans tout le document : si une variable est x dans la définition, elle reste x dans l'exemple.
4. Ne pas résumer, ne pas paraphraser : reprendre la substance mathématique telle quelle. Si une phrase de transition est manquante pour la fluidité, en ajouter une courte sans inventer de math.
5. Si un passage est illisible ou ambigu, le marquer <!-- UNSURE: ... --> avec le fragment original.
6. Conserver les exemples résolus, les corrections d'exercices, les contre-exemples. Numéroter les exercices et les questions multi-parties.
7. Pas de fioritures, pas d'emoji, pas de préambule type « Voici le markdown ». Réponse = uniquement le markdown propre."""


@dataclass
class Source:
    chapter: int
    role: str
    label: str
    url: str
    slug: str = ""

    @property
    def chapter_slug(self) -> str:
        return CHAPTER_SLUGS[self.chapter]

    @property
    def is_pdf(self) -> bool:
        return urlparse(self.url).path.lower().endswith(".pdf")

    @property
    def extractor(self) -> str:
        return "crawl4ai-pdf" if self.is_pdf else "crawl4ai-html"

    @property
    def chapter_dir(self) -> Path:
        return OUTPUT_ROOT / self.chapter_slug

    @property
    def raw_path(self) -> Path:
        return self.chapter_dir / f"{self.slug}.raw.md"

    @property
    def clean_path(self) -> Path:
        return self.chapter_dir / f"{self.slug}.md"


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def host_key(url: str) -> str:
    netloc = urlparse(url).netloc.lower().lstrip(".")
    if netloc.startswith("www."):
        netloc = netloc[4:]
    if netloc in HOST_KEYS:
        return HOST_KEYS[netloc]
    return netloc.split(".")[0] or "unknown"


def make_slug(url: str) -> str:
    host = host_key(url)
    parsed = urlparse(url)
    parts = [p for p in parsed.path.split("/") if p]
    if not parts:
        return slugify(host)
    last = parts[-1]
    if "." in last:
        last = last.rsplit(".", 1)[0]
    return slugify(f"{host}-{last}")


def find_links(text: str):
    return re.findall(r"\[([^\]]+)\]\(([^)]+)\)", text)


def parse_sources(markdown_text: str) -> list[Source]:
    sources: list[Source] = []
    current_chapter: Optional[int] = None

    for raw_line in markdown_text.splitlines():
        line = raw_line.rstrip()

        m_sec = re.match(r"^###\s+(\d+)\.\s+(.+)$", line)
        if m_sec:
            current_chapter = int(m_sec.group(1))
            continue

        m_row = re.match(r"^\|\s*(\d+)\.\s+([^|]+?)\s*\|([^|]*)\|([^|]*)\|", line)
        if m_row:
            chapter = int(m_row.group(1))
            cours_cell = m_row.group(3)
            td_cell = m_row.group(4)
            for label, url in find_links(cours_cell):
                sources.append(Source(chapter=chapter, role="cours", label=label, url=url))
            for label, url in find_links(td_cell):
                role = "td" if "td" in label.lower() else "exercices"
                sources.append(Source(chapter=chapter, role=role, label=label, url=url))
            continue

        m_bul = re.match(r"^-\s+(TD|Cours)\s*:\s*(.+)$", line)
        if m_bul and current_chapter is not None:
            role = "td" if m_bul.group(1) == "TD" else "cours"
            for label, url in find_links(m_bul.group(2)):
                sources.append(Source(chapter=current_chapter, role=role, label=label, url=url))
            continue

    seen = set()
    unique: list[Source] = []
    for src in sources:
        if src.url in seen:
            continue
        seen.add(src.url)
        src.slug = make_slug(src.url)
        unique.append(src)
    return unique


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def write_with_header(path: Path, header: dict, body: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    yaml_lines = ["---"]
    for k, v in header.items():
        value = str(v).replace('"', '\\"')
        yaml_lines.append(f'{k}: "{value}"')
    yaml_lines.append("---")
    full = "\n".join(yaml_lines) + "\n\n" + body.strip() + "\n"
    path.write_text(full, encoding="utf-8")


def load_manifest() -> dict:
    if MANIFEST_PATH.exists():
        return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    return {"sources": {}}


def save_manifest(manifest: dict) -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8"
    )


async def fetch_pdf_fallback(url: str) -> tuple[str, Optional[str]]:
    """Plain httpx + pypdf fallback when crawl4ai's PDFCrawlerStrategy fails to download
    (e.g. parfenoff.org closes the connection on crawl4ai's default User-Agent)."""
    try:
        import httpx
        import io
        import pypdf
        async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client:
            resp = await client.get(url, headers={"User-Agent": "Mozilla/5.0"})
            resp.raise_for_status()
        reader = pypdf.PdfReader(io.BytesIO(resp.content))
        text = "\n\n".join((page.extract_text() or "") for page in reader.pages)
        if not text.strip():
            return "", "fallback_pypdf_empty_text"
        return text, None
    except Exception as exc:
        return "", f"fallback_exception: {exc!r}"


async def fetch_markdown(source: Source, pdf_crawler, html_crawler, pdf_config, html_config) -> tuple[str, Optional[str]]:
    try:
        if source.is_pdf:
            result = await pdf_crawler.arun(url=source.url, config=pdf_config)
        else:
            result = await html_crawler.arun(url=source.url, config=html_config)
    except Exception as exc:
        return "", f"crawl4ai_exception: {exc!r}"

    if not result:
        return "", "crawl4ai_no_result"

    md = str(result.markdown or "")

    # PDFCrawlerStrategy returns a 33-byte stub HTML ("Scraper will handle the real work")
    # which trips crawl4ai's anti-bot Near-empty content detector and forces success=False
    # even though PDFContentScrapingStrategy successfully extracted the PDF. Trust the
    # markdown content instead of the success flag for PDFs.
    if source.is_pdf:
        if not md.strip():
            fallback_md, fb_err = await fetch_pdf_fallback(source.url)
            if fallback_md.strip():
                return fallback_md, None
            err = getattr(result, "error_message", None) or "empty PDF markdown"
            return "", f"crawl4ai_pdf_empty: {err}; {fb_err}"
        return md, None

    if not getattr(result, "success", True):
        status = getattr(result, "status_code", None)
        err = getattr(result, "error_message", None)
        return "", f"crawl4ai_failed: status={status} err={err}"

    if not md.strip():
        return "", "crawl4ai_empty_markdown"
    return md, None


async def deepseek_clean(markdown_text: str, source: Source, client, model: str) -> tuple[str, Optional[str]]:
    if not markdown_text.strip():
        return "", "empty_input"

    MAX_CHARS = 50000
    if len(markdown_text) <= MAX_CHARS:
        chunks = [markdown_text]
    else:
        paras = markdown_text.split("\n\n")
        chunks: list[str] = []
        buf: list[str] = []
        size = 0
        for p in paras:
            if buf and size + len(p) + 2 > MAX_CHARS:
                chunks.append("\n\n".join(buf))
                buf = [p]
                size = len(p)
            else:
                buf.append(p)
                size += len(p) + 2
        if buf:
            chunks.append("\n\n".join(buf))

    out_parts: list[str] = []
    for i, chunk in enumerate(chunks):
        try:
            resp = await client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {
                        "role": "user",
                        "content": (
                            f"Source : {source.url}\n"
                            f"Rôle : {source.role}\n"
                            f"Chapitre : {source.chapter_slug}\n"
                            f"Partie {i + 1}/{len(chunks)}.\n\n---\n\n{chunk}"
                        ),
                    },
                ],
                temperature=0.1,
                max_tokens=8000,
            )
        except Exception as exc:
            return "", f"deepseek_exception: {exc!r}"
        out_parts.append((resp.choices[0].message.content or "").strip())

    return "\n\n".join(out_parts), None


async def process_source(
    source: Source,
    manifest: dict,
    *,
    crawl_sem: asyncio.Semaphore,
    clean_sem: asyncio.Semaphore,
    pdf_crawler,
    html_crawler,
    pdf_config,
    html_config,
    deepseek_client,
    deepseek_model: str,
    no_clean: bool,
    keep_raw: bool,
) -> None:
    print(f"[start] {source.chapter_slug} / {source.slug} ({source.extractor})", file=sys.stderr)
    entry = {
        "chapter": source.chapter_slug,
        "role": source.role,
        "label": source.label,
        "source_url": source.url,
        "extractor": source.extractor,
        "raw_path": str(source.raw_path.relative_to(ROOT)),
        "clean_path": str(source.clean_path.relative_to(ROOT)),
        "status": "extracting",
        "extracted_at": None,
        "cleaned_at": None,
        "raw_chars": 0,
        "clean_chars": 0,
        "error": None,
    }
    manifest["sources"][source.url] = entry

    async with crawl_sem:
        raw_md, err = await fetch_markdown(source, pdf_crawler, html_crawler, pdf_config, html_config)
    if err:
        entry["status"] = "extract_failed"
        entry["error"] = err
        print(f"[fail extract] {source.slug}: {err}", file=sys.stderr)
        return

    entry["raw_chars"] = len(raw_md)
    entry["extracted_at"] = now_iso()
    if keep_raw:
        write_with_header(
            source.raw_path,
            {
                "source_url": source.url,
                "chapter": source.chapter_slug,
                "role": source.role,
                "extractor": source.extractor,
                "extracted_at": entry["extracted_at"],
            },
            raw_md,
        )

    if no_clean or deepseek_client is None:
        write_with_header(
            source.clean_path,
            {
                "source_url": source.url,
                "chapter": source.chapter_slug,
                "role": source.role,
                "cleaned": "false",
                "extracted_at": entry["extracted_at"],
            },
            raw_md,
        )
        entry["clean_chars"] = len(raw_md)
        entry["status"] = "ok-raw"
        print(f"[ok raw] {source.slug} ({entry['raw_chars']} chars)", file=sys.stderr)
        return

    async with clean_sem:
        clean_md, err = await deepseek_clean(raw_md, source, deepseek_client, deepseek_model)
    if err:
        entry["status"] = "clean_failed"
        entry["error"] = err
        print(f"[fail clean] {source.slug}: {err}", file=sys.stderr)
        return

    cleaned_at = now_iso()
    write_with_header(
        source.clean_path,
        {
            "source_url": source.url,
            "chapter": source.chapter_slug,
            "role": source.role,
            "cleaned": "true",
            "cleaner": deepseek_model,
            "extracted_at": entry["extracted_at"],
            "cleaned_at": cleaned_at,
        },
        clean_md,
    )
    entry["clean_chars"] = len(clean_md)
    entry["cleaned_at"] = cleaned_at
    entry["status"] = "ok"
    print(f"[ok] {source.slug} (raw {entry['raw_chars']} -> clean {entry['clean_chars']})", file=sys.stderr)


async def main_async(args) -> int:
    load_dotenv(ROOT / ".env")

    text = LINKS_FILE.read_text(encoding="utf-8")
    sources = parse_sources(text)

    if args.only:
        sources = [s for s in sources if s.chapter_slug == args.only]
        if not sources:
            print(f"[error] no sources for chapter {args.only}", file=sys.stderr)
            return 2

    if args.dry_run:
        print(f"=== dry-run: {len(sources)} sources ===")
        for s in sources:
            print(f"  [{s.chapter_slug}] {s.role:10} {s.extractor:14} {s.slug}")
            print(f"      url : {s.url}")
            print(f"      out : {s.clean_path.relative_to(ROOT)}")
        return 0

    manifest = load_manifest()

    if not args.force:
        skip = {u for u, e in manifest["sources"].items() if e.get("status") in ("ok", "ok-raw")}
        before = len(sources)
        sources = [s for s in sources if s.url not in skip]
        skipped = before - len(sources)
        if skipped:
            print(f"[skip] {skipped} sources already ok (use --force to redo)", file=sys.stderr)

    if not sources:
        print("[done] nothing to do.", file=sys.stderr)
        return 0

    deepseek_client = None
    deepseek_model = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")
    if not args.no_clean:
        key = (os.getenv("DEEPSEEK_API_KEY") or "").strip()
        if not key:
            print("[warn] DEEPSEEK_API_KEY missing in .env; falling back to --no-clean", file=sys.stderr)
            args.no_clean = True
        else:
            from openai import AsyncOpenAI
            base_url = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com")
            deepseek_client = AsyncOpenAI(api_key=key, base_url=base_url)

    from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    from crawl4ai.processors.pdf import PDFCrawlerStrategy, PDFContentScrapingStrategy

    crawl_sem = asyncio.Semaphore(4)
    clean_sem = asyncio.Semaphore(2)
    html_config = CrawlerRunConfig(word_count_threshold=10)
    pdf_config = CrawlerRunConfig(scraping_strategy=PDFContentScrapingStrategy())

    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    try:
        async with AsyncWebCrawler() as html_crawler:
            async with AsyncWebCrawler(crawler_strategy=PDFCrawlerStrategy()) as pdf_crawler:
                await asyncio.gather(
                    *(
                        process_source(
                            s,
                            manifest,
                            crawl_sem=crawl_sem,
                            clean_sem=clean_sem,
                            pdf_crawler=pdf_crawler,
                            html_crawler=html_crawler,
                            pdf_config=pdf_config,
                            html_config=html_config,
                            deepseek_client=deepseek_client,
                            deepseek_model=deepseek_model,
                            no_clean=args.no_clean,
                            keep_raw=args.keep_raw,
                        )
                        for s in sources
                    )
                )
    finally:
        save_manifest(manifest)
        if deepseek_client is not None:
            await deepseek_client.close()

    ok = sum(1 for e in manifest["sources"].values() if e.get("status") in ("ok", "ok-raw"))
    fail = sum(1 for e in manifest["sources"].values() if "failed" in (e.get("status") or ""))
    print(f"\n[summary] ok={ok}  fail={fail}  total={len(manifest['sources'])}", file=sys.stderr)
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--only", help="chapter slug, e.g. 01-second-degre")
    parser.add_argument("--no-clean", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--keep-raw", action="store_true", help="also write <slug>.raw.md alongside the cleaned .md")
    args = parser.parse_args()
    sys.exit(asyncio.run(main_async(args)))


if __name__ == "__main__":
    main()
