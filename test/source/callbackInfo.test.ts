import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function callbackInfoSuite() {
  describe("CallbackInfo", () => {
    it("sets and reads callback data", DEFAULT, () => {
      binding.callbackInfo.testCbSetData();
      assert.ok(true);
    });
  });
}
