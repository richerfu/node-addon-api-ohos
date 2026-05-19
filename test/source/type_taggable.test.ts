import { describe, it, DEFAULT } from "./utils/framework.test";
import binding from "./utils/binding";
import assert from "./utils/assert.test";

function testTypeTaggable(group: any) {
  const obj1 = group.typeTaggedInstance(0);
  const obj2 = group.typeTaggedInstance(1);

  assert.strictEqual(group.checkTypeTag(0, obj1), true);
  assert.strictEqual(group.checkTypeTag(1, obj2), true);
  assert.strictEqual(group.checkTypeTag(0, obj2), false);
  assert.strictEqual(group.checkTypeTag(1, obj1), false);
  assert.strictEqual(group.checkTypeTag(0, {}), false);
  assert.strictEqual(group.checkTypeTag(1, {}), false);
}

export default function typeTaggableSuite() {
  describe("TypeTaggable", () => {
    it("checks type tags on objects and externals", DEFAULT, () => {
      testTypeTaggable(binding.type_taggable.external);
      testTypeTaggable(binding.type_taggable.object);
    });
  });
}
