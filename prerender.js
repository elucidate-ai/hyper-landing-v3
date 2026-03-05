import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const template = fs.readFileSync(
  path.resolve(__dirname, 'dist/client/index.html'),
  'utf-8'
);

const { render, routes } = await import('./dist/server/entry-server.js');

for (const route of routes) {
  const appHtml = render(route);
  const html = template.replace('<!--app-html-->', appHtml);

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
