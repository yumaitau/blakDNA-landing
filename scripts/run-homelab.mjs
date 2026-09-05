import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
const name = `blakdna-landing-journey-${randomBytes(6).toString("hex")}`;
const docker = (args) => execFileSync("docker", args, { stdio: "inherit" });
try {
  docker(["build", "-f", "Dockerfile.test", "-t", name, "."]);
  docker(["create", "--name", name, "--init", "--shm-size=1g", "-e", `UPDATE_VISUALS=${process.env.UPDATE_VISUALS ?? "0"}`, name]);
  try { docker(["start", "-a", name]); }
  finally {
    mkdirSync("test-results", { recursive: true });
    for (const [source, target] of [["/app/test-results/.", "test-results"], ["/app/playwright-report", "."], ["/app/.lighthouseci", "."], ["/app/tests/browser/visual", "tests/browser"]]) {
      try { docker(["cp", `${name}:${source}`, target]); } catch {}
    }
  }
  const code = execFileSync("docker", ["inspect", name, "--format", "{{.State.ExitCode}}"], { encoding: "utf8" }).trim();
  if (code !== "0") throw new Error(`Homelab journey exited ${code}`);
} finally { try { docker(["rm", "-f", name]); } catch {} }
