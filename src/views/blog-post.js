import { layoutView } from './layout.js';

export function blogPostView(post) {
  const content = `
    <article>
      <h2>${post.title}</h2>
      <p class="post-date">Published ${new Date(post.created_at).toLocaleDateString()}</p>
      <div class="post-content">
        ${post.content}
      </div>
      <p><a href="/api/blog">← Back to all posts</a></p>
    </article>
  `;
  return layoutView(content);
}
