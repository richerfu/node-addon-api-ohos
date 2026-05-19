import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function functionReferenceSuite() {
  describe("FunctionReference", () => {
    it("calls and constructs through function references", DEFAULT, async () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const recv: any = { base: 4 };
      const addWithThis = function (this: any, a: number, b: number, c: number) {
        return this.base + a + b + c;
      };

      assert.strictEqual(binding.functionreference.CallWithInitList(add, 1, 2, 3), 6);
      assert.strictEqual(binding.functionreference.CallWithVec(add, 1, 2, 3), 6);
      assert.strictEqual(binding.functionreference.CallWithRecvArgc(addWithThis, recv, 1, 2, 3), 10);
      assert.strictEqual(binding.functionreference.CallWithRecvVector(addWithThis, recv, 1, 2, 3), 10);
      assert.strictEqual(binding.functionreference.CallWithRecvInitList(addWithThis, recv, 1, 2, 3), 10);

      assert.strictEqual(binding.functionreference.CreateFuncRefWithNew(1).getValue(), 1);
      assert.strictEqual(binding.functionreference.CreateFuncRefWithNewVec(2).getValue(), 2);
      assert.strictEqual(binding.functionreference.ConstructWithMove(() => 42), 42);

      const asyncResult = await binding.functionreference.AsyncCallWithVector(add, 1, 2, 3);
      assert.strictEqual(asyncResult, 6);
    });
  });
}
