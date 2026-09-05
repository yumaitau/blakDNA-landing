import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

test("published product captures preserve reviewed dimensions and source hashes", async () => {
  const root = new URL("../public/images/product/", import.meta.url);
  const manifest = JSON.parse(await readFile(new URL("manifest.json", root), "utf8"));
  assert.equal(manifest.synthetic, true);
  assert.equal(manifest.deterministicHermes, true);
  assert.equal(manifest.inventory.length, 40);
  for (const item of manifest.inventory) {
    assert.match(item.project, /^(desktop|mobile)$/);
    assert.match(item.filename, /^\d{2}-[a-z-]+\.png$/);
    const bytes = await readFile(new URL(`${item.project}/${item.filename}`, root));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), item.sha256);
    assert.equal(bytes.readUInt32BE(16), item.width);
    assert.equal(bytes.readUInt32BE(20), item.height);
  }
});
