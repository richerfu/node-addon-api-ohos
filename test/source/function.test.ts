import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

function add3(a: number, b: number, c: number) {
  return a + b + c;
}

export default function functionSuite() {
  describe("Function", () => {
    it("creates, calls, constructs, and make-callbacks", DEFAULT, () => {
      for (const group of [binding.function.plain, binding.function.templated]) {
        assert.strictEqual(group.emptyConstructor(true), true);
        assert.strictEqual(group.emptyConstructor(false), false);

        const target: any = {};
        group.voidCallback(target);
        assert.deepStrictEqual(target, { foo: "bar" });
        assert.deepStrictEqual(group.valueCallback(), { foo: "bar" });
        assert.deepStrictEqual(group.valueCallbackWithData(), { foo: "bar", data: 1 });

        assert.strictEqual(group.callWithArgs(add3, 1, 2, 3), 6);
        assert.strictEqual(group.callWithVector(add3, 1, 2, 3), 6);
        assert.strictEqual(group.callWithCStyleArray(add3, 1, 2, 3), 6);
        assert.strictEqual(group.callWithFunctionOperator(add3, 1, 2, 3), 6);

        function Ctor(this: any, a: number, b: number, c: number) {
          this.sum = a + b + c;
        }
        assert.strictEqual(group.callConstructorWithArgs(Ctor, 1, 2, 3).sum, 6);
        assert.strictEqual(group.callConstructorWithVector(Ctor, 1, 2, 3).sum, 6);
        assert.strictEqual(group.callConstructorWithCStyleArray(Ctor, 1, 2, 3).sum, 6);
      }
    });
  });
}
