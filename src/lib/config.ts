export interface PublicConfiguration {
  siteUrl: string;
  salesUrl: string;
  deploymentUrl: string;
  indexing: boolean;
}

export function publicHttpsUrl(value: string, originOnly = false): string {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.hash ||
    ["localhost", "example.com", "example.test"].includes(url.hostname) ||
    (originOnly && (url.pathname !== "/" || url.search))) throw new Error("Public URLs must be real HTTPS destinations without credentials");
  return originOnly ? url.origin : url.href;
}

export function resolveConfiguration(environment: Record<string, string | undefined>): PublicConfiguration {
  if (environment.PUBLIC_INDEXING && !["0", "1"].includes(environment.PUBLIC_INDEXING)) throw new Error("PUBLIC_INDEXING must be 0 or 1");
  return Object.freeze({
    siteUrl: publicHttpsUrl(environment.PUBLIC_SITE_URL ?? "https://blakdna-landing.pages.dev", true),
    salesUrl: publicHttpsUrl(environment.PUBLIC_SALES_URL ?? "https://www.yumait.com.au/contact"),
    deploymentUrl: publicHttpsUrl(environment.PUBLIC_DEPLOY_URL ?? "https://github.com/yumaitau/blakDNA-aws-deploy"),
    indexing: environment.PUBLIC_INDEXING !== "0",
  });
}

export function canonicalUrl(siteUrl: string, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || /[?#\\]/.test(path)) throw new Error("Canonical path must be local");
  return new URL(path, publicHttpsUrl(siteUrl, true)).href;
}

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}
