import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";

test("published product captures preserve reviewed dimensions and source hashes", async () => {
  const root = new URL("../public/images/product/", import.meta.url);
  const manifest = JSON.parse(await readFile(new URL("manifest.json", root), "utf8"));
  assert.equal(manifest.synthetic, true);
  assert.equal(manifest.deterministicHermes, true);
  assert.equal(manifest.inventory.length, 12);
  const selected = ["06-critical-risk", "07-evidence", "08-human-response", "09-verified-remediation", "10-adaptive-immunity", "12-recurrence"].map((name) => `${name}-detail.png`);
  for (const project of ["desktop", "mobile"]) {
    assert.deepEqual((await readdir(new URL(`${project}/`, root))).sort(), [...selected].sort());
  }
  for (const item of manifest.inventory) {
    assert.match(item.project, /^(desktop|mobile)$/);
    assert.ok(selected.includes(item.filename));
    const bytes = await readFile(new URL(`${item.project}/${item.filename}`, root));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), item.sha256);
    assert.equal(bytes.readUInt32BE(16), item.width);
    assert.equal(bytes.readUInt32BE(20), item.height);
  }
});
