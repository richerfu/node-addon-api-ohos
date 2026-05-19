import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function dateSuite() {
  describe("Date", () => {
    it("creates date values from double and time_point", DEFAULT, () => {
      assert.deepStrictEqual(binding.date.CreateDate(0), new Date(0));
      assert.deepStrictEqual(binding.date.CreateDateFromTimePoint(), new Date(0));
      assert.strictEqual(binding.date.IsDate(new Date(0)), true);
      assert.strictEqual(binding.date.ValueOf(new Date(42)), 42);
      assert.strictEqual(binding.date.OperatorValue(new Date(42)), true);
    });
  });
}
