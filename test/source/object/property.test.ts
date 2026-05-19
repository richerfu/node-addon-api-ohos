import { describe, it, DEFAULT } from "../utils/framework.test";
import binding from "../utils/binding";
import assert from "../utils/assert.test";

export default function objectPropertySuite() {
  describe("ObjectProperty", () => {
    it("gets, sets, deletes, checks, and subscripts", DEFAULT, () => {
      const obj: any = { foo: "bar", 1: "one" };

      assert.strictEqual(binding.object.getPropertyWithCStyleString(obj, "foo"), "bar");
      assert.strictEqual(binding.object.getPropertyWithCppStyleString(obj, "foo"), "bar");
      assert.strictEqual(binding.object.getPropertyWithUint32(obj, 1), "one");

      binding.object.setPropertyWithCStyleString(obj, "a", 1);
      binding.object.setPropertyWithCppStyleString(obj, "b", 2);
      binding.object.setPropertyWithUint32(obj, 2, "two");
      assert.deepStrictEqual([obj.a, obj.b, obj[2]], [1, 2, "two"]);

      assert.strictEqual(binding.object.hasPropertyWithCStyleString(obj, "a"), true);
      assert.strictEqual(binding.object.hasOwnPropertyWithCppStyleString(obj, "b"), true);
      assert.strictEqual(binding.object.deletePropertyWithCStyleString(obj, "a"), true);
      assert.strictEqual(Object.prototype.hasOwnProperty.call(obj, "a"), false);

      obj.flag = true;
      assert.strictEqual(binding.object.subscriptGetWithCStyleString(obj, "flag"), true);
      binding.object.subscriptSetWithCppStyleString(obj, "flag", false);
      assert.strictEqual(obj.flag, false);
      binding.object.subscriptSetAtIndex(obj, 3, true);
      assert.strictEqual(binding.object.subscriptGetAtIndex(obj, 3), true);
    });
  });
}
