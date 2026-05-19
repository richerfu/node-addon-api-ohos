import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function handleScopeSuite() {
  describe("HandleScope", () => {
    it("creates and escapes scopes", DEFAULT, () => {
      assert.strictEqual(binding.handlescope.createScope(), "scope");
      assert.strictEqual(binding.handlescope.createScopeFromExisting(), "existing_scope");
      assert.strictEqual(binding.handlescope.escapeFromScope(), "inner-scope");
      assert.strictEqual(binding.handlescope.escapeFromExistingScope(), "inner-existing-scope");
      assert.strictEqual(binding.handlescope.stressEscapeFromScope(), "inner-scope999999");
      assert.throws(() => binding.handlescope.doubleEscapeFromScope(), Error);
    });
  });
}
