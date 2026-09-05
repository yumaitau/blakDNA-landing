import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";
const server = spawn(process.execPath, ["scripts/serve.mjs"], { stdio: "inherit" });
const run = (args) => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, args, { stdio: "inherit", env: { ...process.env, BLAKDNA_SITE_TEST_URL: "http://127.0.0.1:4321" } });
  child.on("error", reject); child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`Journey command failed: ${code}`)));
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 30; attempt++) {
    try { if ((await fetch("http://127.0.0.1:4321")).ok) { ready = true; break; } } catch {}
    await setTimeout(200);
  }
  if (!ready) throw new Error("Static test server did not start");
  await run(["node_modules/@playwright/test/cli.js", "test", ...(process.env.UPDATE_VISUALS === "1" ? ["--update-snapshots"] : [])]);
  await run(["scripts/lighthouse.mjs"]);
} finally { server.kill("SIGTERM"); }
