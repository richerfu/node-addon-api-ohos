import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function runScriptSuite() {
  describe("RunScript", () => {
    it("runs strings and context wrappers", DEFAULT, () => {
      assert.strictEqual(binding.run_script.plainString(), 6);
      assert.strictEqual(binding.run_script.stdString(), 6);
      assert.strictEqual(binding.run_script.jsString("1 + 2 + 3"), 6);
      assert.throws(() => binding.run_script.jsString(true), {
        message: "A string was expected",
      });
      assert.strictEqual(binding.run_script.withContext("a + b + c", { a: 1, b: 2, c: 3 }), 6);
    });
  });
}
