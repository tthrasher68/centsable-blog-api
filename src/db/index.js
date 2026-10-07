import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('railway') ? { rejectUnauthorized: false } : false,
});

async function initializeDatabase() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT,
        content TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS webhook_events (
        id SERIAL PRIMARY KEY,
        event_name TEXT,
        payload JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
  } finally {
    client.release();
  }
}

export async function query(text, params = []) {
  const result = await pool.query(text, params);
  return result;
}

export async function getPosts() {
  const { rows } = await query(
    `SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC`
  );
  return rows;
}

export async function getPostBySlug(slug) {
  const { rows } = await query(
    `SELECT * FROM blog_posts WHERE slug = $1 AND status = 'published' LIMIT 1`,
    [slug]
  );
  return rows[0] || null;
}

export async function insertWebhookEvent(eventName, payload) {
  await query(
    `INSERT INTO webhook_events (event_name, payload) VALUES ($1, $2)`,
    [eventName, payload]
  );
}

export { pool, initializeDatabase };
