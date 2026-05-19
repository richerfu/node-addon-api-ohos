import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";
import { runGCTests } from "./utils/gc.test";

export default function referenceSuite() {
  describe("Reference", () => {
    it("supports weak refs, ref/unref, reset, and moves", DEFAULT, async () => {
      binding.reference.refMoveAssignTest();
      binding.reference.referenceRefTest();
      binding.reference.refResetTest();
      await runGCTests([
        "weak array",
        () => {
          binding.reference.createWeakArray();
          assert.strictEqual(binding.reference.accessWeakArrayEmpty(), false);
        },
        () => {
          assert.strictEqual(binding.reference.accessWeakArrayEmpty(), true);
        },
      ]);
    });
  });
}
