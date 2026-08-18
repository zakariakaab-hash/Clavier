import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { parseCurrentPath } from './src/utils/routes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Explicit sitemap.xml with XML Content-Type
  app.get('/sitemap.xml', (req, res) => {
    const distSitemap = path.join(process.cwd(), 'dist', 'sitemap.xml');
    const publicSitemap = path.join(process.cwd(), 'public', 'sitemap.xml');
    const filePath = fs.existsSync(distSitemap) ? distSitemap : publicSitemap;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(filePath);
  });

  // Explicit robots.txt with text/plain Content-Type
  app.get('/robots.txt', (req, res) => {
    const distRobots = path.join(process.cwd(), 'dist', 'robots.txt');
    const publicRobots = path.join(process.cwd(), 'public', 'robots.txt');
    const filePath = fs.existsSync(distRobots) ? distRobots : publicRobots;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(filePath);
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
      const parsed = parseCurrentPath(req.path, req.url.includes('?') ? req.url.split('?')[1] : '');
      const indexPath = path.join(distPath, 'index.html');
      if (parsed.isNotFound) {
        res.status(404).sendFile(indexPath);
      } else {
        res.status(200).sendFile(indexPath);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KeypadKing server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
