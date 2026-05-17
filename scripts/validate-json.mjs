import { existsSync, readdirSync, readFileSync } from 'fs';
import { dirname, join, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const IGNORED_DIRS = new Set(['.git', '.codex-ralph', '.playwright-mcp', 'node_modules']);
const MATIERES = ['mathematiques', 'physique-chimie', 'francais', 'anglais', 'sciences-de-lingenieur'];
const SUJET_MATIERES = [...MATIERES, 'sciences-de-lingenieur-solution'];

const TOPICS_BY_MATIERE = {
  mathematiques: new Set([
    'algebre-lineaire',
    'probabilites-statistiques',
    'analyse',
    'geometrie',
    'calcul-differentiel',
  ]),
  'physique-chimie': new Set([
    'mecanique',
    'thermodynamique',
    'electricite',
    'optique',
    'chimie-generale',
    'chimie-organique',
  ]),
  'sciences-de-lingenieur': new Set([
    'modelisation-mecanique',
    'resistance-materiaux',
    'automatique',
    'energetique',
    'materiaux',
  ]),
  francais: new Set([
    'comprehension-texte',
    'synthese',
    'redaction',
    'contraction',
  ]),
  anglais: new Set([
    'comprehension-ecrite',
    'expression-ecrite',
    'vocabulaire-technique',
    'traduction',
  ]),
};

function rel(filePath) {
  return relative(ROOT, filePath).split(sep).join('/');
}

function issue(issues, filePath, message) {
  issues.push(`${rel(filePath)}: ${message}`);
}

function listJsonFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        files.push(...listJsonFiles(join(directory, entry.name)));
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(join(directory, entry.name));
    }
  }

  return files.sort();
}

function readJson(filePath, issues) {
  const buffer = readFileSync(filePath);
  const hasBom = buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
  const text = buffer.toString('utf8');

  if (buffer.length === 0 || text.trim().length === 0) {
    issue(issues, filePath, 'fichier JSON vide');
    return null;
  }

  if (hasBom) {
    issue(issues, filePath, 'BOM UTF-8 interdit au debut du fichier');
  }

  try {
    return JSON.parse(text.replace(/^\uFEFF/, ''));
  } catch (error) {
    issue(issues, filePath, `JSON invalide: ${error.message}`);
    return null;
  }
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function requireFields(issues, filePath, object, fields, pathLabel = 'racine') {
  for (const field of fields) {
    if (!hasOwn(object, field)) {
      issue(issues, filePath, `${pathLabel}: champ manquant "${field}"`);
    }
  }
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function normalizeMatiere(matiere) {
  return matiere === 'sciences-de-lingenieur-solution' ? 'sciences-de-lingenieur' : matiere;
}

function validateTopicId(issues, filePath, matiere, topicId, pathLabel) {
  const normalizedMatiere = normalizeMatiere(matiere);
  const allowedTopics = TOPICS_BY_MATIERE[normalizedMatiere];

  if (!allowedTopics) {
    issue(issues, filePath, `${pathLabel}: matiere invalide "${matiere}"`);
    return;
  }

  if (!allowedTopics.has(topicId)) {
    issue(issues, filePath, `${pathLabel}: topic invalide "${topicId}" pour "${matiere}"`);
  }
}

function validateSujet(filePath, data, issues, year, fileMatiere) {
  if (!isObject(data)) {
    issue(issues, filePath, 'racine: un sujet doit etre un objet JSON');
    return;
  }

  requireFields(issues, filePath, data, ['annee', 'matiere', 'source', 'url', 'topics']);

  if (data.annee !== Number(year)) {
    issue(issues, filePath, `racine: "annee" doit valoir ${year}`);
  }
  if (data.matiere !== fileMatiere) {
    issue(issues, filePath, `racine: "matiere" doit valoir "${fileMatiere}"`);
  }
  if (!SUJET_MATIERES.includes(data.matiere)) {
    issue(issues, filePath, `racine: matiere invalide "${data.matiere}"`);
  }
  if (!isNonEmptyString(data.source)) {
    issue(issues, filePath, 'racine: "source" doit etre une chaine non vide');
  }
  if (!isNonEmptyString(data.url)) {
    issue(issues, filePath, 'racine: "url" doit etre une chaine non vide');
  }
  if (!Array.isArray(data.topics)) {
    issue(issues, filePath, 'racine: "topics" doit etre un tableau');
    return;
  }

  data.topics.forEach((topic, index) => {
    const pathLabel = `topics[${index}]`;
    if (!isObject(topic)) {
      issue(issues, filePath, `${pathLabel}: doit etre un objet`);
      return;
    }

    requireFields(issues, filePath, topic, ['id', 'nom', 'occurrences', 'mentionJury'], pathLabel);

    if (!isNonEmptyString(topic.id)) {
      issue(issues, filePath, `${pathLabel}: "id" doit etre une chaine non vide`);
    } else {
      validateTopicId(issues, filePath, data.matiere, topic.id, pathLabel);
    }
    if (!isNonEmptyString(topic.nom)) {
      issue(issues, filePath, `${pathLabel}: "nom" doit etre une chaine non vide`);
    }
    if (!isPositiveInteger(topic.occurrences)) {
      issue(issues, filePath, `${pathLabel}: "occurrences" doit etre un entier positif`);
    }
    if (typeof topic.mentionJury !== 'boolean') {
      issue(issues, filePath, `${pathLabel}: "mentionJury" doit etre un booleen`);
    }
    if (hasOwn(topic, 'sousChapitre') && typeof topic.sousChapitre !== 'string') {
      issue(issues, filePath, `${pathLabel}: "sousChapitre" doit etre une chaine`);
    }
    if (hasOwn(topic, 'notes') && typeof topic.notes !== 'string') {
      issue(issues, filePath, `${pathLabel}: "notes" doit etre une chaine`);
    }
  });
}

function validateRapport(filePath, data, issues, year) {
  if (!isObject(data)) {
    issue(issues, filePath, 'racine: un rapport de jury doit etre un objet JSON');
    return;
  }

  requireFields(issues, filePath, data, ['annee', 'source', 'url', 'observations']);

  if (data.annee !== Number(year)) {
    issue(issues, filePath, `racine: "annee" doit valoir ${year}`);
  }
  if (!isNonEmptyString(data.source)) {
    issue(issues, filePath, 'racine: "source" doit etre une chaine non vide');
  }
  if (!isNonEmptyString(data.url)) {
    issue(issues, filePath, 'racine: "url" doit etre une chaine non vide');
  }
  if (!Array.isArray(data.observations)) {
    issue(issues, filePath, 'racine: "observations" doit etre un tableau');
    return;
  }

  data.observations.forEach((observation, index) => {
    const pathLabel = `observations[${index}]`;
    if (!isObject(observation)) {
      issue(issues, filePath, `${pathLabel}: doit etre un objet`);
      return;
    }

    requireFields(issues, filePath, observation, ['matiere', 'topicId', 'observation', 'importance'], pathLabel);

    if (!MATIERES.includes(observation.matiere)) {
      issue(issues, filePath, `${pathLabel}: matiere invalide "${observation.matiere}"`);
    }
    if (!isNonEmptyString(observation.topicId)) {
      issue(issues, filePath, `${pathLabel}: "topicId" doit etre une chaine non vide`);
    } else {
      validateTopicId(issues, filePath, observation.matiere, observation.topicId, pathLabel);
    }
    if (!isNonEmptyString(observation.observation)) {
      issue(issues, filePath, `${pathLabel}: "observation" doit etre une chaine non vide`);
    }
    if (!isNonEmptyString(observation.importance)) {
      issue(issues, filePath, `${pathLabel}: "importance" doit etre une chaine non vide`);
    }
  });
}

function validateWeightedTopics(filePath, data, issues) {
  if (!isObject(data)) {
    issue(issues, filePath, 'racine: weighted-topics doit etre un objet JSON');
    return;
  }

  requireFields(issues, filePath, data, ['_meta', ...MATIERES]);

  for (const matiere of MATIERES) {
    if (!Array.isArray(data[matiere])) {
      issue(issues, filePath, `racine: "${matiere}" doit etre un tableau`);
      continue;
    }

    data[matiere].forEach((topic, index) => {
      const pathLabel = `${matiere}[${index}]`;
      if (!isObject(topic)) {
        issue(issues, filePath, `${pathLabel}: doit etre un objet`);
        return;
      }

      requireFields(issues, filePath, topic, ['id', 'nom', 'totalOccurrences', 'score', 'years'], pathLabel);

      if (!isNonEmptyString(topic.id)) {
        issue(issues, filePath, `${pathLabel}: "id" doit etre une chaine non vide`);
      } else {
        validateTopicId(issues, filePath, matiere, topic.id, pathLabel);
      }
      if (!isNonEmptyString(topic.nom)) {
        issue(issues, filePath, `${pathLabel}: "nom" doit etre une chaine non vide`);
      }
      if (!isPositiveInteger(topic.totalOccurrences)) {
        issue(issues, filePath, `${pathLabel}: "totalOccurrences" doit etre un entier positif`);
      }
      if (typeof topic.score !== 'number' || !Number.isFinite(topic.score) || topic.score <= 0) {
        issue(issues, filePath, `${pathLabel}: "score" doit etre un nombre positif`);
      }
      if (!Array.isArray(topic.years) || topic.years.some((year) => !Number.isInteger(year))) {
        issue(issues, filePath, `${pathLabel}: "years" doit etre un tableau d'annees entieres`);
      }
    });
  }
}

function validateAtsData(filePath, data, issues) {
  const relativePath = rel(filePath);
  const parts = relativePath.split('/');
  const sujetMatch = relativePath.match(/^data\/ats\/sujets\/(\d{4})\/(.+)\.json$/);
  const rapportMatch = relativePath.match(/^data\/ats\/jurys\/(\d{4})\/rapport\.json$/);

  if (sujetMatch) {
    validateSujet(filePath, data, issues, sujetMatch[1], sujetMatch[2]);
    return;
  }

  if (rapportMatch) {
    validateRapport(filePath, data, issues, rapportMatch[1]);
    return;
  }

  if (parts.join('/') === 'data/ats/poids/weighted-topics.json') {
    validateWeightedTopics(filePath, data, issues);
  }
}

const issues = [];
const jsonFiles = listJsonFiles(ROOT);

for (const filePath of jsonFiles) {
  const data = readJson(filePath, issues);
  if (data !== null && rel(filePath).startsWith('data/ats/')) {
    validateAtsData(filePath, data, issues);
  }
}

if (issues.length > 0) {
  console.error(`FAIL JSON validation: ${issues.length} probleme(s) detecte(s).`);
  for (const message of issues) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log(`PASS JSON validation: ${jsonFiles.length} fichiers JSON verifies; schema ATS et topics valides.`);
