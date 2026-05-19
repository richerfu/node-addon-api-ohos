import { describe, it, DEFAULT } from "../utils/framework.test";
import binding from "../utils/binding";
import assert from "../utils/assert.test";

function assertPropertyIs(obj: any, key: string, attribute: string) {
  const propDesc = Object.getOwnPropertyDescriptor(obj, key);
  assert.ok(propDesc);
  assert.ok(propDesc[attribute]);
}

function assertPropertyIsNot(obj: any, key: string, attribute: string) {
  const propDesc = Object.getOwnPropertyDescriptor(obj, key);
  assert.ok(propDesc);
  assert.ok(!propDesc[attribute]);
}

export default function objectSuite() {
  describe("Object", () => {
    it("defines properties and gets prototypes", DEFAULT, () => {
      for (const nameType of ["literal", "string", "value"]) {
        const obj: any = {};
        binding.object.defineProperties(obj, nameType);

        assertPropertyIsNot(obj, "readonlyAccessor", "enumerable");
        assertPropertyIsNot(obj, "readonlyAccessor", "configurable");
        assert.strictEqual(obj.readonlyAccessor, true);

        assertPropertyIsNot(obj, "readwriteAccessor", "enumerable");
        obj.readwriteAccessor = false;
        assert.strictEqual(obj.readwriteAccessor, false);
        obj.readwriteAccessor = true;
        assert.strictEqual(obj.readwriteAccessor, true);

        assertPropertyIsNot(obj, "readonlyValue", "writable");
        assert.strictEqual(obj.readonlyValue, true);
        assertPropertyIs(obj, "readwriteValue", "writable");
        obj.readwriteValue = false;
        assert.strictEqual(obj.readwriteValue, false);
        assertPropertyIs(obj, "enumerableValue", "enumerable");
        assertPropertyIs(obj, "configurableValue", "configurable");
        assert.strictEqual(obj.function(), true);
        assert.strictEqual(obj.functionWithUserData(), obj.readonlyAccessorWithUserDataT);
      }

      assert.strictEqual(binding.object.emptyConstructor(true), true);
      assert.strictEqual(binding.object.emptyConstructor(false), false);

      const expected = { one: 1, two: 2, three: 3 };
      assert.deepStrictEqual(binding.object.constructorFromObject(expected), expected);

      const magicObject = binding.object.createObjectUsingMagic();
      assert.strictEqual(magicObject.cp_false, false);
      assert.strictEqual(magicObject.cp_true, true);
      assert.strictEqual(magicObject["42"], 120);
      assert.strictEqual(magicObject.circular, magicObject);

      function Ctor() {}
      assert.strictEqual(binding.object.instanceOf(new (Ctor as any)(), Ctor), true);
      assert.strictEqual(binding.object.instanceOf({}, Ctor), false);
      assert.strictEqual(binding.object.instanceOf(null, Ctor), false);

      for (const prototype of [null, {}, Object.prototype]) {
        const obj = Object.create(prototype);
        assert.strictEqual(binding.object.getPrototype(obj), prototype);
      }
    });
  });
}
