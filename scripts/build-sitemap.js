import { promises as fs } from "fs";
import JSZip from "jszip";

const zipPath = "public/tldr-pages.zip";
const sitemapPath = "public/pages-sitemap.xml";

const zip = await JSZip.loadAsync(await fs.readFile(zipPath));

const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const sitemapFooter = `</urlset>`;

const urls = Object.keys(zip.files)
  .filter((path) => path.endsWith(".md"))
  .map((path) => path.slice("tldr-main/".length, -".md".length)) //remove prefix tldr-main/ and '.md'
  .filter((path) => path.startsWith("pages")) //only pages
  .map((part) => `https://man.notch1p.xyz/${part}`); //add prefix https://man.notch1p.xyz/

console.log(`Sitemap page urls count: ${urls.length}`);

const sitemapEntries = urls
  .map((url) => `<url><loc>${url}</loc></url>`)
  .join("\n");

const sitemap = sitemapHeader + sitemapEntries + sitemapFooter;

console.log("Writing sitemap.xml");
await fs.writeFile(sitemapPath, sitemap);
