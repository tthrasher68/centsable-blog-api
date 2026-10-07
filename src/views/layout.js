export function layoutView(content) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Centsable Blog</title>
    <style>
      :root {
        --bg: #0f172a;
        --panel: #111827;
        --card: #1f2937;
        --text: #e5e7eb;
        --muted: #94a3b8;
        --accent: #38bdf8;
        --accent-strong: #0ea5e9;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(180deg, var(--bg), #020817);
        color: var(--text);
        line-height: 1.6;
      }
      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 32px 20px 80px;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      }
      .brand {
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .nav a {
        color: var(--text);
        text-decoration: none;
        margin-left: 16px;
        color: var(--muted);
      }
      .card {
        background: rgba(17, 24, 39, 0.9);
        border: 1px solid rgba(148, 163, 184, 0.15);
        border-radius: 18px;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.3);
      }
      article {
        padding: 32px;
      }
      h1, h2, h3 {
        margin-top: 0;
        line-height: 1.2;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 20px;
      }
      .post {
        padding: 24px;
        text-decoration: none;
        color: var(--text);
        display: block;
      }
      .meta {
        color: var(--muted);
        font-size: 0.9rem;
        margin-bottom: 12px;
      }
      .excerpt {
        color: var(--muted);
      }
      .cta {
        display: inline-block;
        margin-top: 16px;
        color: var(--accent);
        text-decoration: none;
        font-weight: 600;
      }
      .post-content {
        color: #dbeafe;
      }
      .post-content p {
        margin: 0 0 1rem;
      }
      .post-content ul,
      .post-content ol {
        padding-left: 1.5rem;
      }
      .small-link {
        color: var(--accent);
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header class="topbar">
        <div class="brand">Centsable</div>
        <nav class="nav">
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href="/sitemap.xml">Sitemap</a>
        </nav>
      </header>
      <main>${content}</main>
    </div>
  </body>
</html>`;
}
