import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("dist");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };
const headers = Object.fromEntries((await readFile(resolve(root, "_headers"), "utf8")).split("\n").filter((line) => /^  [^:]+:/.test(line)).map((line) => {
  const separator = line.indexOf(":"); return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
}));
createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method ?? "")) { response.writeHead(405).end(); return; }
  let file;
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) { response.writeHead(400).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const body = await readFile(file);
    response.writeHead(200, { ...headers, "content-type": types[extname(file)] ?? "application/octet-stream", "content-length": body.length });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    const body = await readFile(resolve(root, "404.html"));
    response.writeHead(404, { ...headers, "content-type": "text/html; charset=utf-8" }).end(request.method === "HEAD" ? undefined : body);
  }
}).listen(Number(process.env.PORT ?? 4321), "0.0.0.0", () => console.log("Static site ready"));
