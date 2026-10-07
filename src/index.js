import express from 'express';
import dotenv from 'dotenv';

import blogRoutes from './routes/blog.js';
import sitemapRoutes from './routes/sitemap.js';
import webhookRoutes from './routes/webhook.js';
import { initializeDatabase } from './db/index.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/', blogRoutes);
app.use('/api', blogRoutes);
app.use('/sitemap', sitemapRoutes);
app.use('/webhook', webhookRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'centsable-blog-api' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Centsable blog API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start app:', error);
  process.exit(1);
});
