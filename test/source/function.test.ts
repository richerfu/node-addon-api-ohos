import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

function add3(a: number, b: number, c: number) {
  return a + b + c;
}

export default function functionSuite() {
  describe("Function", () => {
    it("creates, calls, constructs, and make-callbacks", DEFAULT, () => {
      assert.strictEqual(binding.function.emptyConstructor(true), true);
      assert.strictEqual(binding.function.emptyConstructor(false), false);

      const target: any = {};
      binding.function.voidCallback(target);
      assert.deepStrictEqual(target, { foo: "bar" });
      assert.deepStrictEqual(binding.function.valueCallback(), { foo: "bar" });
      assert.deepStrictEqual(binding.function.valueCallbackWithData(), { foo: "bar", data: 1 });

      assert.strictEqual(binding.function.callWithArgs(add3, 1, 2, 3), 6);
      assert.strictEqual(binding.function.callWithVector(add3, 1, 2, 3), 6);
      assert.strictEqual(binding.function.callWithCStyleArray(add3, 1, 2, 3), 6);
      assert.strictEqual(binding.function.callWithFunctionOperator(add3, 1, 2, 3), 6);

      function Ctor(this: any, a: number, b: number, c: number) {
        this.sum = a + b + c;
      }
      assert.strictEqual(binding.function.callConstructorWithArgs(Ctor, 1, 2, 3).sum, 6);
      assert.strictEqual(binding.function.callConstructorWithVector(Ctor, 1, 2, 3).sum, 6);
      assert.strictEqual(binding.function.callConstructorWithCStyleArray(Ctor, 1, 2, 3).sum, 6);
    });
  });
}
