import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://saramsa.ai";
const today = new Date().toISOString().split("T")[0];

const routes = [
  { path: "/",            changefreq: "weekly",  priority: "1.0" },
  { path: "/features",    changefreq: "monthly", priority: "0.9" },
  { path: "/integrations",changefreq: "monthly", priority: "0.8" },
  { path: "/pricing",     changefreq: "monthly", priority: "0.8" },
  { path: "/about",       changefreq: "monthly", priority: "0.7" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✓ sitemap.xml generated at ${outPath}`);
