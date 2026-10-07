import { layoutView } from './layout.js';

export function blogPostView(post) {
  const date = new Date(post.created_at).toLocaleDateString();

  return layoutView(`
    <article class="card">
      <div class="meta">Published ${date}</div>
      <h1>${post.title}</h1>
      <div class="post-content">${post.content}</div>
      <p><a href="/blog" class="small-link">← Back to all posts</a></p>
    </article>
  `);
}
