import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";
import { runGCTests } from "./utils/gc.test";

export default function arrayBufferSuite() {
  describe("ArrayBuffer", () => {
    it("creates and validates internal and external buffers", DEFAULT, async () => {
      await runGCTests([
        "internal",
        () => {
          const test = binding.arraybuffer.createBuffer();
          binding.arraybuffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          binding.arraybuffer.checkBuffer(test.slice(0));
        },
        "external",
        () => {
          const test = binding.arraybuffer.createExternalBuffer();
          binding.arraybuffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          assert.strictEqual(binding.arraybuffer.getFinalizeCount(), 0);
        },
        () => assert.strictEqual(binding.arraybuffer.getFinalizeCount(), 0),
        "external with finalizer",
        () => {
          const test = binding.arraybuffer.createExternalBufferWithFinalize();
          binding.arraybuffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
        },
        () => assert.strictEqual(binding.arraybuffer.getFinalizeCount(), 1),
        "constructor",
        () => {
          assert.strictEqual(binding.arraybuffer.checkEmptyBuffer(), true);
          const test = binding.arraybuffer.createBufferWithConstructor();
          binding.arraybuffer.checkBuffer(test);
        },
      ]);
    });
  });
}
