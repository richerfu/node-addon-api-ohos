import { describe, it, DEFAULT } from './utils/framework.test';
import binding from './utils/binding';
import assert from './utils/assert.test';
import { runGCTests } from './utils/gc.test';

export default function testCase() {
  describe("Buffer", () => {
    it("RunBuffer", DEFAULT, () => {
      return runGCTests([
        'Internal Buffer',
        () => {
          const test = binding.buffer.createBuffer();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);

          const test2 = test.slice(0);
          binding.buffer.checkBuffer(test2);
        },

        'Buffer copy',
        () => {
          const test = binding.buffer.createBufferCopy();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
        },

        'External Buffer',
        () => {
          const test = binding.buffer.createExternalBuffer();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },
        () => {
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },

        'External Buffer with finalizer',
        () => {
          const test = binding.buffer.createExternalBufferWithFinalize();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },
        () => {},
        () => {
          assert.strictEqual(1, binding.buffer.getFinalizeCount());
        },

        'External Buffer with finalizer hint',
        () => {
          const test = binding.buffer.createExternalBufferWithFinalizeHint();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },
        () => {},
        () => {
          assert.strictEqual(1, binding.buffer.getFinalizeCount());
        },

        'Create or Copy External Buffer',
        () => {
          const test = binding.buffer.createOrCopyExternalBuffer();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },
        () => {
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },

        'Create or Copy External Buffer with finalizer',
        () => {
          const test = binding.buffer.createOrCopyExternalBufferWithFinalize();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },
        () => {},
        () => {
          assert.strictEqual(1, binding.buffer.getFinalizeCount());
        },

        'Create or Copy External Buffer with finalizer hint',
        () => {
          const test = binding.buffer.createOrCopyExternalBufferWithFinalizeHint();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },
        () => {},
        () => {
          assert.strictEqual(1, binding.buffer.getFinalizeCount());
        },

        'Create or Copy External Buffer when NODE_API_NO_EXTERNAL_BUFFERS_ALLOWED defined',
        () => {
          const test = binding.bufferNoExternal.createOrCopyExternalBuffer();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },
        () => {
          assert.strictEqual(0, binding.buffer.getFinalizeCount());
        },

        'Create or Copy External Buffer with finalizer when NODE_API_NO_EXTERNAL_BUFFERS_ALLOWED defined',
        () => {
          const test = binding.bufferNoExternal.createOrCopyExternalBufferWithFinalize();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          // finalizer should have been called when the buffer was created.
          assert.strictEqual(1, binding.buffer.getFinalizeCount());
        },
        () => {},
        () => {
          assert.strictEqual(1, binding.buffer.getFinalizeCount());
        },

        'Create or Copy External Buffer with finalizer hint when NODE_API_NO_EXTERNAL_BUFFERS_ALLOWED defined',
        () => {
          const test = binding.bufferNoExternal.createOrCopyExternalBufferWithFinalizeHint();
          binding.buffer.checkBuffer(test);
          assert.ok(test instanceof ArrayBuffer);
          // finalizer should have been called when the buffer was created.
          assert.strictEqual(1, binding.buffer.getFinalizeCount());
        },
        () => {},
        () => {
          assert.strictEqual(1, binding.buffer.getFinalizeCount());
        }
      ]);
    })
  })
}
