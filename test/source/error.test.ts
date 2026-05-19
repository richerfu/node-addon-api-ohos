import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function errorSuite() {
  describe("Error", () => {
    it("throws and catches JS errors", DEFAULT, () => {
      binding.error.testErrorCopySemantics();
      binding.error.testErrorMoveSemantics();

      assert.throws(() => binding.error.throwJSError("test"), (err: any) => {
        return err && err.message === "test";
      });
      assert.throws(() => binding.error.throwTypeErrorCStr("test"), (err: any) => {
        return err && err.message === "test";
      });
      assert.throws(() => binding.error.throwRangeErrorCStr("test"), (err: any) => {
        return err && err.message === "test";
      });

      const err = binding.error.catchError(() => {
        throw new TypeError("test");
      });
      assert.ok(err);
      assert.strictEqual(err.message, "test");
      assert.strictEqual(
        binding.error.catchErrorMessage(() => {
          throw new TypeError("test");
        }),
        "test",
      );
    });
  });
}
