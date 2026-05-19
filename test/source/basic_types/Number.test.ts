import { describe, it, DEFAULT } from "../utils/framework.test";
import binding from "../utils/binding";
import assert from "../utils/assert.test";

export default function basicTypeNumber() {
  describe("basic_type_number_test", () => {
    it("RunNumber", DEFAULT, () => {
      const MIN_INT32 = -2147483648;
      const MAX_INT32 = 2147483647;
      const MIN_UINT32 = 0;
      const MAX_UINT32 = 4294967295;
      const MIN_INT64 = Number.MIN_SAFE_INTEGER;
      const MAX_INT64 = Number.MAX_SAFE_INTEGER;
      const MIN_FLOAT = binding.basic_types_number.minFloat();
      const MAX_FLOAT = binding.basic_types_number.maxFloat();
      const MIN_DOUBLE = binding.basic_types_number.minDouble();
      const MAX_DOUBLE = binding.basic_types_number.maxDouble();

      for (const value of [MIN_INT32, -1, 0, 1, MAX_INT32]) {
        assert.strictEqual(binding.basic_types_number.toInt32(value), value);
        assert.strictEqual(binding.basic_types_number.createNumberFromExistingValue(value), value);
      }

      for (const value of [MIN_UINT32, 1, MAX_UINT32]) {
        assert.strictEqual(binding.basic_types_number.toUint32(value), value);
        assert.strictEqual(binding.basic_types_number.createNumberFromExistingValue(value), value);
      }

      for (const value of [MIN_INT64, -1, 0, 1, MAX_INT64]) {
        assert.strictEqual(binding.basic_types_number.toInt64(value), value);
      }

      assert.strictEqual(binding.basic_types_number.toFloat(MIN_FLOAT), MIN_FLOAT);
      assert.strictEqual(binding.basic_types_number.toFloat(MAX_FLOAT), MAX_FLOAT);
      assert.strictEqual(binding.basic_types_number.toDouble(MIN_DOUBLE), MIN_DOUBLE);
      assert.strictEqual(binding.basic_types_number.toDouble(MAX_DOUBLE), MAX_DOUBLE);

      assert.strictEqual(binding.basic_types_number.operatorInt32(MIN_INT32), true);
      assert.strictEqual(binding.basic_types_number.operatorInt32(MAX_INT32), true);
      assert.strictEqual(binding.basic_types_number.operatorUint32(MIN_UINT32), true);
      assert.strictEqual(binding.basic_types_number.operatorUint32(MAX_UINT32), true);
      assert.strictEqual(binding.basic_types_number.operatorInt64(MIN_INT64), true);
      assert.strictEqual(binding.basic_types_number.operatorInt64(MAX_INT64), true);
      assert.strictEqual(binding.basic_types_number.operatorFloat(MIN_FLOAT), true);
      assert.strictEqual(binding.basic_types_number.operatorFloat(MAX_FLOAT), true);
      assert.strictEqual(binding.basic_types_number.operatorDouble(MIN_DOUBLE), true);
      assert.strictEqual(binding.basic_types_number.operatorDouble(MAX_DOUBLE), true);
      assert.strictEqual(binding.basic_types_number.createEmptyNumber(), true);
    });
  });
}
