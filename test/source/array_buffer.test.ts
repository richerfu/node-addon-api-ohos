import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function arrayBufferSuite() {
  describe("ArrayBuffer", () => {
    it("creates and validates internal buffers", DEFAULT, () => {
      const test = binding.arraybuffer.createBuffer();
      binding.arraybuffer.checkBuffer(test);
      assert.ok(test instanceof ArrayBuffer);

      assert.strictEqual(binding.arraybuffer.checkEmptyBuffer(), true);
      const constructed = binding.arraybuffer.createBufferWithConstructor();
      binding.arraybuffer.checkBuffer(constructed);
    });
  });
}
