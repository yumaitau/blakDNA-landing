import { routePaths } from "../data/pages";
import { configuration } from "../data/site";
import { canonicalUrl } from "../lib/config";
export function GET() {
  const entries = configuration.indexing ? routePaths.map((path) => `<url><loc>${canonicalUrl(configuration.siteUrl, path)}</loc></url>`).join("") : "";
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { "content-type": "application/xml; charset=utf-8" } });
}
