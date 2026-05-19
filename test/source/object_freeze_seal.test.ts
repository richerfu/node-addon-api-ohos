import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function objectFreezeSealSuite() {
  describe("ObjectFreezeSeal", () => {
    it("freezes and seals objects", DEFAULT, () => {
      const frozen: any = { x: "a", y: "b" };
      assert.strictEqual(binding.object_freeze_seal.freeze(frozen), true);
      assert.strictEqual(Object.isFrozen(frozen), true);
      assert.throws(() => {
        frozen.x = 10;
      }, TypeError);

      const sealed: any = { x: "a", y: "b" };
      assert.strictEqual(binding.object_freeze_seal.seal(sealed), true);
      assert.strictEqual(Object.isSealed(sealed), true);
      sealed.x = "d";
      assert.strictEqual(sealed.x, "d");
      assert.throws(() => {
        sealed.z = "c";
      }, TypeError);
    });
  });
}
