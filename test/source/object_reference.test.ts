import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

const VAL_TYPES = { JS: 0, C_STR: 1, CPP_STR: 2, BOOL: 3, INT: 4, DOUBLE: 5, JS_CAST: 6 };
const KEY_TYPES = { C_STR: 1, CPP_STR: 2, INT: 4 };

export default function objectReferenceSuite() {
  describe("ObjectReference", () => {
    it("sets and gets referenced object properties", DEFAULT, () => {
      const cases = [
        { keyType: KEY_TYPES.C_STR, valType: VAL_TYPES.C_STR, key: "a", val: "one" },
        { keyType: KEY_TYPES.CPP_STR, valType: VAL_TYPES.CPP_STR, key: "b", val: "two" },
        { keyType: KEY_TYPES.CPP_STR, valType: VAL_TYPES.JS, key: "c", val: { three: 3 } },
        { keyType: KEY_TYPES.INT, valType: VAL_TYPES.DOUBLE, key: 4, val: 4.5 },
        { keyType: KEY_TYPES.C_STR, valType: VAL_TYPES.BOOL, key: "ok", val: true },
      ];

      for (const item of cases) {
        binding.objectreference.setObject(item);
        for (const refName of ["weak", "persistent", "reference"]) {
          const obj = binding.objectreference.getFromValue(refName);
          assert.deepStrictEqual(obj[item.key], item.val);
          assert.deepStrictEqual(binding.objectreference.getFromGetters(refName, item), item.val);
        }
      }

      binding.objectreference.moveOpTest();
      binding.objectreference.setCastedObjects();
      assert.deepStrictEqual(binding.objectreference.getCastedFromValue("weak"), ["hello", "world", "!"]);
    });
  });
}
