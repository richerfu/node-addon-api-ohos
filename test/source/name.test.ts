import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function nameSuite() {
  describe("Name", () => {
    it("handles strings and string_view without exposing Symbol helpers", DEFAULT, () => {
      const expected = "123456789";

      assert.throws(binding.name.nullStringShouldThrow, {
        message: "Error in native callback",
      });
      assert.ok(binding.name.checkString(expected, "utf8"));
      assert.ok(binding.name.checkString(expected, "utf16"));
      assert.ok(binding.name.checkString(expected.substr(0, 3), "utf8", 3));
      assert.ok(binding.name.checkString(expected.substr(0, 3), "utf16", 3));

      const str1 = binding.name.createString("utf8");
      assert.strictEqual(str1, expected);
      assert.ok(binding.name.checkString(str1, "utf8"));
      assert.ok(binding.name.checkString(str1, "utf16"));

      const substr1 = binding.name.createString("utf8", 3);
      assert.strictEqual(substr1, expected.substr(0, 3));

      const str2 = binding.name.createString("utf16");
      assert.strictEqual(str2, expected);
      const substr2 = binding.name.createString("utf16", 3);
      assert.strictEqual(substr2, expected.substr(0, 3));

      const longString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (let i = 10; i <= longString.length; i++) {
        const str = longString.substr(0, i);
        assert.strictEqual(binding.name.echoString(str, "utf8"), str);
        assert.strictEqual(binding.name.echoString(str, "utf16"), str);
      }

      assert.strictEqual(binding.name.createStringFromStringView(), "hello1");
      assert.strictEqual("createSymbol" in binding.name, false);
      assert.strictEqual("createSymbolFromStringView" in binding.name, false);
    });
  });
}
