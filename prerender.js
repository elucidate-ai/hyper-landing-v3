import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const template = fs.readFileSync(
  path.resolve(__dirname, 'dist/client/index.html'),
  'utf-8'
);

const DOMAIN = 'https://usehypr.com';

const { render, routes, routesMeta } = await import('./dist/server/entry-server.js');

for (const route of routes) {
  const appHtml = render(route);
  let html = template.replace('<!--app-html-->', appHtml);

  const meta = routesMeta[route];
  if (meta) {
    const canonicalUrl = `${DOMAIN}${route === '/' ? '' : route}`;

    // 1. Replace <title>
    html = html.replace('<title>Hypr</title>', `<title>${meta.title}</title>`);

    // 2. Replace meta description (multiline tag)
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s,
      `<meta name="description" content="${meta.description}" />`
    );

    // 3. Replace OG tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${meta.title}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${meta.description}" />`
    );

    // 4. Replace Twitter tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${meta.title}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${meta.description}" />`
    );

    // 5. Fix og:image and twitter:image to absolute URLs
    html = html.replace(
      'content="/assets/og-image.png"',
      `content="${DOMAIN}/assets/og-image.png"`
    );
    html = html.replace(
      'content="/assets/og-image.png"',
      `content="${DOMAIN}/assets/og-image.png"`
    );

    // 6. Add canonical URL and 7. Add JSON-LD structured data before </head>
    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Hypr',
          url: DOMAIN,
        },
        {
          '@type': 'WebPage',
          name: meta.title,
          description: meta.description,
          url: canonicalUrl,
        },
      ],
    });

    const headInsert =
      `<link rel="canonical" href="${canonicalUrl}" />\n` +
      `    <script type="application/ld+json">${jsonLd}</script>\n    `;

    html = html.replace('</head>', `${headInsert}</head>`);
  }

  const routePath =
    route === '/'
      ? 'dist/client/index.html'
      : `dist/client${route}/index.html`;

  const filePath = path.resolve(__dirname, routePath);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, html);
  console.log('Pre-rendered:', route, '->', routePath);
}

// Generate sitemap.xml
const BASE_URL = 'https://usehypr.com';
const sitemapEntries = routes.map((route) => {
  const loc = route === '/' ? BASE_URL : `${BASE_URL}${route}`;
  const priority = route === '/' ? '1.0' : '0.8';
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>
`;

fs.writeFileSync(
  path.resolve(__dirname, 'dist/client/sitemap.xml'),
  sitemap
);
console.log('Sitemap generated: dist/client/sitemap.xml');
