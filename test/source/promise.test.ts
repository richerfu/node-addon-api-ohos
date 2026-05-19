import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function promiseSuite() {
  describe("Promise", () => {
    it("resolves, rejects, then, and catch", DEFAULT, async () => {
      assert.strictEqual(binding.promise.isPromise({}), false);

      const resolving = binding.promise.resolvePromise("resolved");
      assert.strictEqual(binding.promise.isPromise(resolving), true);
      assert.strictEqual(await resolving, "resolved");

      const rejecting = binding.promise.rejectPromise("error");
      assert.strictEqual(binding.promise.isPromise(rejecting), true);
      try {
        await rejecting;
        assert.fail("rejecting promise should reject");
      } catch (err) {
        assert.strictEqual(err, "error");
      }

      assert.strictEqual(binding.promise.promiseReturnsCorrectEnv(), true);

      const onFulfilled = (value: number) => value * 2;
      const onRejected = (reason: string) => `${reason}!`;

      const thenOnFulfilled = binding.promise.thenMethodOnFulfilled(onFulfilled);
      assert.strictEqual(thenOnFulfilled.isPromise, true);
      assert.strictEqual(await thenOnFulfilled.promise, 84);

      const thenResolve =
        binding.promise.thenMethodOnFulfilledOnRejectedResolve(onFulfilled, onRejected);
      assert.strictEqual(thenResolve.isPromise, true);
      assert.strictEqual(await thenResolve.promise, 84);

      const thenRejected =
        binding.promise.thenMethodOnFulfilledOnRejectedReject(onFulfilled, onRejected);
      assert.strictEqual(thenRejected.isPromise, true);
      assert.strictEqual(await thenRejected.promise, "Rejected!");

      const catchMethod = binding.promise.catchMethod(onRejected);
      assert.strictEqual(catchMethod.isPromise, true);
      assert.strictEqual(await catchMethod.promise, "Rejected!");
    });
  });
}
