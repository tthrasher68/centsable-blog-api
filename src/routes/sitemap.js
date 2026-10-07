import express from 'express';

const router = express.Router();

router.get('/sitemap.xml', async (_req, res) => {
  try {
    const { getPosts } = await import('../db/index.js');
    const posts = await getPosts();

    const urlSet = posts
      .map((post) => `  <url><loc>${process.env.APP_URL || 'http://localhost:3000'}/blog/${post.slug}</loc></url>`)
      .join('\n');

    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlSet}\n</urlset>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to generate sitemap');
  }
});

export default router;
