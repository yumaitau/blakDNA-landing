import { test } from "node:test";
import assert from "node:assert/strict";
import { testTarget } from "../scripts/test-target.ts";
import { jsonLd } from "../src/lib/config.ts";

test("empty test targets consistently start a dedicated local server", () => {
  for (const value of [undefined, "", "  "]) assert.deepEqual(testTarget(value), { baseURL: "http://127.0.0.1:4321", external: false });
  assert.deepEqual(testTarget(" https://blakdna-landing.pages.dev/ "), { baseURL: "https://blakdna-landing.pages.dev", external: true });
  for (const value of ["https://user:password@host.test", "file:///tmp/site", "https://host.test/path", "https://host.test/?query=yes", "https://host.test/#fragment"]) assert.throws(() => testTarget(value));
});

test("structured data explicitly rejects non-serializable top-level values", () => {
  for (const value of [undefined, () => {}, Symbol("value")]) assert.throws(() => jsonLd(value), /JSON serializable/);
  assert.equal(jsonLd(null), "null");
  assert.equal(jsonLd({ text: "</script>" }), '{"text":"\\u003c/script>"}');
});
