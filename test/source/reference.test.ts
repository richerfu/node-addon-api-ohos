import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function referenceSuite() {
  describe("Reference", () => {
    it("supports ref/unref, reset, and moves", DEFAULT, () => {
      binding.reference.refMoveAssignTest();
      binding.reference.referenceRefTest();
      binding.reference.refResetTest();
      assert.ok(true);
    });
  });
}
