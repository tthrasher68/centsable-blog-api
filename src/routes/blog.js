import express from 'express';

import { getPostBySlug, getPosts } from '../db/index.js';
import { blogListView } from '../views/blog-list.js';
import { blogPostView } from '../views/blog-post.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const posts = await getPosts();
    res.send(blogListView(posts));
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to load blog');
  }
});

router.get('/blog', async (_req, res) => {
  try {
    const posts = await getPosts();
    res.send(blogListView(posts));
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to load blog');
  }
});

router.get('/blog/:slug', async (req, res) => {
  try {
    const post = await getPostBySlug(req.params.slug);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    return res.send(blogPostView(post));
  } catch (error) {
    console.error(error);
    return res.status(500).send('Unable to load post');
  }
});

router.get('/api/blog', async (_req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load blog posts' });
  }
});

router.get('/api/blog/:slug', async (req, res) => {
  try {
    const post = await getPostBySlug(req.params.slug);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to load post' });
  }
});

export default router;
