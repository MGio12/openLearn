import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SUJETS_DIR = join(ROOT, 'data', 'ats', 'sujets');
const OUTPUT = join(ROOT, 'data', 'ats', 'poids', 'weighted-topics.json');

const RECENCY_DECAY = 0.9;
const JURY_BONUS = 0.2;
const CURRENT_YEAR = new Date().getFullYear();
const MATIERES = ['mathematiques', 'physique-chimie', 'francais', 'anglais', 'sciences-de-lingenieur'];

function stripBom(s) { return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s; }

function computeWeights() {
  const result = {};
  for (const matiere of MATIERES) {
    const topicMap = {};
    const years = readdirSync(SUJETS_DIR).filter(d => /^\d{4}$/.test(d)).sort();
    for (const year of years) {
      const filePath = join(SUJETS_DIR, year, matiere + '.json');
      let data;
      try { data = JSON.parse(stripBom(readFileSync(filePath, 'utf8'))); }
      catch { continue; }
      const age = CURRENT_YEAR - parseInt(year);
      const recencyWeight = Math.pow(RECENCY_DECAY, age);
      for (const topic of (data.topics || [])) {
        if (!topicMap[topic.id]) {
          topicMap[topic.id] = { id: topic.id, nom: topic.nom, totalOccurrences: 0, score: 0, years: [] };
        }
        topicMap[topic.id].totalOccurrences += topic.occurrences;
        topicMap[topic.id].score += topic.occurrences * recencyWeight;
        if (topic.mentionJury) topicMap[topic.id].score += JURY_BONUS;
        topicMap[topic.id].years.push(parseInt(year));
      }
    }
    result[matiere] = Object.values(topicMap).sort((a, b) => b.score - a.score);
  }
  const output = {
    _meta: {
      generated: new Date().toISOString(),
      formula: 'score = frequency x recencyWeight(0.9^age) + juryBonus(0.2)',
      recencyDecay: RECENCY_DECAY,
      juryBonus: JURY_BONUS,
      lastUpdated: new Date().toISOString()
    },
    ...result
  };
  writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf8');
  console.log("weighted-topics.json genere — " + Object.keys(result).length + " matieres");
  for (const [m, topics] of Object.entries(result)) {
    console.log("   " + m + ": " + topics.length + " topics");
  }
}

computeWeights();