import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function typedArraySuite() {
  describe("TypedArray", () => {
    it("creates and inspects typed arrays", DEFAULT, () => {
      const testData = [
        ["int8", Int8Array, 1, new Int8Array([0, 124, 24, 44])],
        ["uint8", Uint8Array, 1, new Uint8Array([0, 255, 2, 14])],
        ["uint8_clamped", Uint8ClampedArray, 1, new Uint8ClampedArray([0, 255, 0, 255])],
        ["int16", Int16Array, 2, new Int16Array([-32768, 32767, 1234, 42])],
        ["uint16", Uint16Array, 2, new Uint16Array([0, 65535, 4, 12])],
        ["int32", Int32Array, 4, new Int32Array([0, -2147483648, 255, 4])],
        ["uint32", Uint32Array, 4, new Uint32Array([0, 4294967295, 24, 125])],
        ["float32", Float32Array, 4, new Float32Array([0, 21, 34, 45])],
        ["float64", Float64Array, 8, new Float64Array([0, 4124, 45, 90])],
      ];

      for (const data of testData) {
        const type = data[0] as string;
        const ctor = data[1] as any;
        const elementSize = data[2] as number;
        const initial = data[3] as any;
        const length = 4;

        const typed = binding.typedarray.createTypedArray(type, length);
        assert.ok(typed instanceof ctor);
        assert.strictEqual(binding.typedarray.getTypedArrayType(typed), type);
        assert.strictEqual(binding.typedarray.getTypedArrayLength(typed), length);
        assert.strictEqual(binding.typedarray.getTypedArraySize(typed), elementSize);
        assert.strictEqual(binding.typedarray.getTypedArrayByteOffset(typed), 0);
        assert.strictEqual(binding.typedarray.getTypedArrayByteLength(typed), elementSize * length);

        typed[3] = 11;
        assert.strictEqual(binding.typedarray.getTypedArrayElement(typed, 3), 11);
        binding.typedarray.setTypedArrayElement(typed, 3, 22);
        assert.strictEqual(typed[3], 22);

        const nonEmptyTypedArray = binding.typedarray.createTypedArray(type, length, initial.buffer);
        binding.typedarray.checkBufferContent(nonEmptyTypedArray, initial);
      }
    });
  });
}
