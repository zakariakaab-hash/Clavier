import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Shared Gemini client lazy initializer
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Health check API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Transliteration & Linguistic breakdown API
  app.post('/api/ai/transliterate', async (req, res) => {
    try {
      const { text, targetLanguage, sourceScript, mode } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: 'Gemini API key is not configured in server environment.',
          fallback: true,
        });
      }

      const prompt = `You are an expert linguist and polyglot specializing in world scripts, historical alphabets, phonetic transcription (IPA), and transliteration (like Lexilogos).
Task:
Process the input text for language/script: "${targetLanguage}" (Source script/context: "${sourceScript || 'any'}", mode: "${mode || 'transliterate'}").

Input text:
"${text}"

Provide a JSON response with:
1. "convertedText": The accurately converted, transliterated, or phonetically transcribed text in the target script/alphabet.
2. "ipa": International Phonetic Alphabet transcription of the text if applicable.
3. "romanization": Latin transliteration or English phonetic reading.
4. "translation": Natural English translation of the text.
5. "breakdown": An array of tokens/characters with their individual pronunciation, meaning, and Unicode name if helpful.
6. "linguisticNotes": 1-2 sentences of interesting linguistic, historical, or orthographic notes (e.g. archaic usage, diacritic rules, root words).

Respond ONLY with valid JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);
      res.json(parsed);
    } catch (err: any) {
      console.error('AI Transliterate error:', err);
      res.status(500).json({ error: err.message || 'Failed to process AI transliteration' });
    }
  });

  // AI Etymology & Lexicography lookup API (Lexilogos style dictionary assistant)
  app.post('/api/ai/etymology', async (req, res) => {
    try {
      const { word, language } = req.body;
      if (!word || typeof word !== 'string') {
        return res.status(400).json({ error: 'Word is required' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({ error: 'Gemini API key not configured' });
      }

      const prompt = `You are a comparative linguist and lexicographer. Provide an in-depth Lexilogos-style lexical and etymological profile for the word "${word}" in ${language || 'its native language'}.

Provide a JSON response with:
- "word": the word
- "script": script name
- "pronunciation": IPA notation
- "partOfSpeech": noun/verb/adj/etc.
- "meanings": array of primary definitions with examples
- "etymology": origins, Proto-Indo-European / Proto-Semitic / Proto-Sino-Tibetan roots, cognates in related languages
- "variants": archaic, regional, or script variants
- "historicalEvolution": brief timeline of how the spelling/meaning changed over centuries.

Respond ONLY in JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('AI Etymology error:', err);
      res.status(500).json({ error: err.message || 'Failed to lookup etymology' });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KeypadKing server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
