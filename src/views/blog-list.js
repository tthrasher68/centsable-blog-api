import { layoutView } from './layout.js';

export function blogListView(posts) {
  const cards = posts.length
    ? posts
        .map(
          (post) => `
            <article class="card post">
              <div class="meta">${new Date(post.created_at).toLocaleDateString()}</div>
              <h2><a href="/blog/${post.slug}" class="small-link">${post.title}</a></h2>
              <p class="excerpt">${post.excerpt || post.content.slice(0, 180)}...</p>
              <a href="/blog/${post.slug}" class="cta">Read article →</a>
            </article>
          `
        )
        .join('')
    : '<article class="card"><p>No posts published yet.</p></article>';

  return layoutView(`
    <section>
      <div class="meta">Latest stories</div>
      <h1>Insights from Centsable</h1>
      <div class="grid">${cards}</div>
    </section>
  `);
}
