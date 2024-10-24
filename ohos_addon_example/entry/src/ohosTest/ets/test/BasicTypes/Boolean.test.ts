import { describe, it, DEFAULT } from "../util/framework.test";
import binding from "../util/binding";
import assert from "../util/assert.test";

export default function basicTypeBoolean() {
  describe("basic_type_boolean_test", () => {
    it("RunBoolean", DEFAULT, () => {
      const bool1 = binding.basic_types_boolean.createBoolean(true);
      assert.strictEqual(bool1, true);

      const bool2 = binding.basic_types_boolean.createBoolean(false);
      assert.strictEqual(bool2, false);

      const emptyBoolean = binding.basic_types_boolean.createEmptyBoolean();
      assert.strictEqual(emptyBoolean, true);

      const bool3 =
        binding.basic_types_boolean.createBooleanFromExistingValue(true);
      assert.strictEqual(bool3, true);

      const bool4 =
        binding.basic_types_boolean.createBooleanFromExistingValue(false);
      assert.strictEqual(bool4, false);

      const bool5 =
        binding.basic_types_boolean.createBooleanFromPrimitive(true);
      assert.strictEqual(bool5, true);

      const bool6 =
        binding.basic_types_boolean.createBooleanFromPrimitive(false);
      assert.strictEqual(bool6, false);

      const bool7 = binding.basic_types_boolean.operatorBool(true);
      assert.strictEqual(bool7, true);

      const bool8 = binding.basic_types_boolean.operatorBool(false);
      assert.strictEqual(bool8, false);
    });
  });
}
