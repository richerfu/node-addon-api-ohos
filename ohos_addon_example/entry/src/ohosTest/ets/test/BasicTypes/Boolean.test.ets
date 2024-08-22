import { describe, expect, it, DEFAULT } from '@ohos/hypium';
import testNapi, { basic_types_boolean } from 'libentry.so';

export default function basicTypeBoolean() {
  describe("basic_type_boolean_test", () => {
    it("RunBoolean", DEFAULT, () => {
      const basic_types_boolean: basic_types_boolean = testNapi.basic_types_boolean;

      expect(basic_types_boolean.createBoolean(true)).assertTrue();
      expect(basic_types_boolean.createBoolean(false)).assertFalse();

      expect(basic_types_boolean.createEmptyBoolean()).assertTrue();

      expect(basic_types_boolean.createBooleanFromExistingValue(true)).assertTrue();
      expect(basic_types_boolean.createBoolean(false)).assertFalse();

      expect(basic_types_boolean.createBooleanFromPrimitive(true)).assertTrue();
      expect(basic_types_boolean.createBoolean(false)).assertFalse();

      expect(basic_types_boolean.operatorBool(true)).assertTrue();
      expect(basic_types_boolean.operatorBool(false)).assertFalse();
    })
  })
}