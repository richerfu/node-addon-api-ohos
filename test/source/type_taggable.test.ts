import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

export default function typeTaggableSuite() {
  describe("TypeTaggable", () => {
    it("exports type tag helpers", DEFAULT, () => {
      assert.strictEqual(typeof binding.type_taggable.external.typeTaggedInstance, "function");
      assert.strictEqual(typeof binding.type_taggable.external.checkTypeTag, "function");
      assert.strictEqual(typeof binding.type_taggable.object.typeTaggedInstance, "function");
      assert.strictEqual(typeof binding.type_taggable.object.checkTypeTag, "function");
    });
  });
}
