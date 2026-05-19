import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function objectWrapFunctionSuite() {
  describe("ObjectWrapFunction", () => {
    it("exports a callable factory constructor", DEFAULT, () => {
      const factory = binding.objectwrap_function;
      const exportsObj = factory();
      const instance = exportsObj.FunctionTest(1, 2, 3);
      assert.ok(instance instanceof exportsObj.FunctionTest);
      assert.throws(() => exportsObj.FunctionTest(true), {
        message: "an exception",
      });
    });
  });
}
