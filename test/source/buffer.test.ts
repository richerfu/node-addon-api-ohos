import { describe, it, DEFAULT } from './utils/framework.test';
import binding from './utils/binding';
import assert from './utils/assert.test';

export default function testCase() {
  describe("Buffer", () => {
    it("RunBuffer", DEFAULT, () => {
      const internal = binding.buffer.createBuffer();
      binding.buffer.checkBuffer(internal);
      assert.ok(internal instanceof ArrayBuffer);

      const copied = binding.buffer.createBufferCopy();
      binding.buffer.checkBuffer(copied);
      assert.ok(copied instanceof ArrayBuffer);
    })
  })
}
