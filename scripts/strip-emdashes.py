#!/usr/bin/env python3
"""
Strip em-dashes from UTF-8 text files.

U+2014 (—) is replaced by ASCII '-'.
U+2013 (–) en-dash is left intact (used for numeric ranges like "30–45").

Idempotent: safe to run multiple times. Re-running on a stripped file
reports 0 replacements.

Usage:
    python3 scripts/strip-emdashes.py apropos.html
    python3 scripts/strip-emdashes.py file1.html file2.html ...
"""
import sys
import pathlib

EM_DASH = "—"
REPLACEMENT = "-"


def strip(path: pathlib.Path) -> int:
    raw = path.read_text(encoding="utf-8")
    count = raw.count(EM_DASH)
    if count:
        path.write_text(raw.replace(EM_DASH, REPLACEMENT), encoding="utf-8")
    return count


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("usage: strip-emdashes.py <file> [<file>...]", file=sys.stderr)
        return 2
    total = 0
    for arg in argv[1:]:
        p = pathlib.Path(arg)
        if not p.is_file():
            print(f"{arg}: not a file, skipped", file=sys.stderr)
            continue
        n = strip(p)
        total += n
        print(f"{arg}: {n} em-dash(es) replaced")
    print(f"total: {total}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
