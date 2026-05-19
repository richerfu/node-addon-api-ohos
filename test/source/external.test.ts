import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";
import { runGCTests } from "./utils/gc.test";

export default function externalSuite() {
  describe("External", () => {
    it("creates external values with finalizers", DEFAULT, async () => {
      await runGCTests([
        "plain",
        () => {
          const value = binding.external.createExternal();
          assert.strictEqual(typeof value, "object");
          binding.external.checkExternal(value);
          assert.strictEqual(binding.external.getFinalizeCount(), 0);
        },
        () => assert.strictEqual(binding.external.getFinalizeCount(), 0),
        "finalizer",
        () => {
          const value = binding.external.createExternalWithFinalize();
          binding.external.checkExternal(value);
        },
        () => assert.strictEqual(binding.external.getFinalizeCount(), 1),
        "finalizer hint",
        () => {
          const value = binding.external.createExternalWithFinalizeHint();
          binding.external.checkExternal(value);
        },
        () => assert.strictEqual(binding.external.getFinalizeCount(), 1),
      ]);
    });
  });
}
