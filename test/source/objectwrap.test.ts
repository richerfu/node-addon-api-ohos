import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function objectWrapSuite() {
  describe("ObjectWrap", () => {
    it("constructs wrapped classes with accessors and methods", DEFAULT, () => {
      const Test = binding.objectwrap.Test;
      const obj = new Test();

      obj.testSetter = "instance";
      assert.strictEqual(obj.testGetter, "instance");
      assert.strictEqual(obj.testGetterT, "instance");

      obj.testGetSet = "getset";
      assert.strictEqual(obj.testGetSet, "getset");
      obj.testGetSetT = "getsetT";
      assert.strictEqual(obj.testGetSetT, "getsetT");

      assert.strictEqual(obj.testMethod("method"), "method instance");
      obj.testVoidMethodT("typed");
      assert.strictEqual(obj.testMethodT(), "typed");

      Test.testStaticSetter = 42;
      assert.strictEqual(Test.testStaticGetter, 42);
      Test.testStaticGetSet = 9;
      assert.strictEqual(Test.testStaticGetSet, 9);
      assert.strictEqual(Test.testStaticMethod("method"), "method static");
      Test.testStaticVoidMethodT("static typed");
      assert.strictEqual(Test.testStaticMethodT(), "static typed");

      assert.strictEqual(Test.canUnWrap(obj), "getsetT");
    });
  });
}
