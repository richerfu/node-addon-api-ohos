import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function objectWrapRemoveWrapSuite() {
  describe("ObjectWrapRemoveWrap", () => {
    it("cleans native data when constructor throws", DEFAULT, () => {
      const Test = binding.objectwrap_removewrap.Test;
      const getDtorCalled = binding.objectwrap_removewrap.getDtorCalled;
      assert.strictEqual(getDtorCalled(), 0);
      assert.throws(() => new Test(), {
        message: "Some error",
      });
      assert.strictEqual(getDtorCalled(), 1);
    });
  });
}
