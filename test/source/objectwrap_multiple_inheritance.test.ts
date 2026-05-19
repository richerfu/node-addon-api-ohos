import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function objectWrapMultipleInheritanceSuite() {
  describe("ObjectWrapMultipleInheritance", () => {
    it("keeps base class fields reachable", DEFAULT, () => {
      const TestMI = binding.objectwrap_multiple_inheritance.TestMI;
      const testmi = new TestMI();
      assert.strictEqual(testmi.test, 0);
    });
  });
}
