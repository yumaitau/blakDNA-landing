import test from "node:test";
import assert from "node:assert/strict";
import { permittedScriptAttributes } from "../scripts/script-policy.mjs";

test("script policy accepts real source and JSON-LD attributes, not aliases", () => {
  for (const attributes of [' src="/scripts/navigation.js" defer', " type='application/ld+json'", ' TYPE="application/ld+json"', " src=/scripts/navigation.js"]) {
    assert.equal(permittedScriptAttributes(attributes), true, attributes);
  }
  for (const attributes of [' data-src="/script.js"', ' data-type="application/ld+json"', ' type="module"', ' src=""', ' src="   "', ` title=' src="/script.js"'`, ' type="module" type="application/ld+json"']) {
    assert.equal(permittedScriptAttributes(attributes), false, attributes);
  }
});
