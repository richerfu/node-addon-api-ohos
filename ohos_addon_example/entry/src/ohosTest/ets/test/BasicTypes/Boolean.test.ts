import { describe, expect, it, DEFAULT } from '../util/framework.test';
import binding from '../util/binding';

export default function basicTypeBoolean() {
  describe("basic_type_boolean_test", () => {
    it("RunBoolean", DEFAULT, () => {
      const basic_types_boolean: ESObject = binding.basic_types_boolean;

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