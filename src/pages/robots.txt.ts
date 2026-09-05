import { configuration } from "../data/site";
export function GET() {
  return new Response(`User-agent: *\n${configuration.indexing ? "Allow: /" : "Disallow: /"}\nSitemap: ${configuration.siteUrl}/sitemap.xml\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
