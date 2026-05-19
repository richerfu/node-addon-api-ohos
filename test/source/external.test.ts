import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function externalSuite() {
  describe("External", () => {
    it("creates external values", DEFAULT, () => {
      const value = binding.external.createExternal();
      assert.strictEqual(typeof value, "object");
      binding.external.checkExternal(value);
      assert.strictEqual(binding.external.getFinalizeCount(), 0);
    });
  });
}
