import { defineConfig } from "astro/config";
import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { resolveConfiguration } from "./src/lib/config.ts";

if (existsSync(".env")) loadEnvFile(".env");
const configuration = resolveConfiguration(process.env);
export default defineConfig({
  site: configuration.siteUrl,
  output: "static",
  trailingSlash: "always",
  build: { inlineStylesheets: "never" },
  vite: { build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
});
