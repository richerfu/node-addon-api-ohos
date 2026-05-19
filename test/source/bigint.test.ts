import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function bigintSuite() {
  describe("BigInt", () => {
    it("round-trips bigint values", DEFAULT, () => {
      const signed = -9007199254740991n;
      const unsigned = 9007199254740991n;
      assert.strictEqual(binding.bigint.IsBigInt(signed), true);
      assert.strictEqual(binding.bigint.IsLossless(signed, true), true);
      assert.strictEqual(binding.bigint.IsLossless(unsigned, false), true);
      assert.strictEqual(binding.bigint.TestInt64(signed), signed);
      assert.strictEqual(binding.bigint.TestUint64(unsigned), unsigned);
      assert.strictEqual(binding.bigint.TestWords(1234567890123456789n), 1234567890123456789n);
    });
  });
}
