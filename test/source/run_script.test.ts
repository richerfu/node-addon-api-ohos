import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function runScriptSuite() {
  describe("RunScript", () => {
    it("exports run script helpers", DEFAULT, () => {
      assert.strictEqual(typeof binding.run_script.plainString, "function");
      assert.strictEqual(typeof binding.run_script.stdString, "function");
      assert.strictEqual(typeof binding.run_script.jsString, "function");
      assert.strictEqual(typeof binding.run_script.withContext, "function");
    });
  });
}
