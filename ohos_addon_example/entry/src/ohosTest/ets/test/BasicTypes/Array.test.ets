import { describe, expect, it, DEFAULT } from '@ohos/hypium';
import testNapi, {basic_types_array} from 'libentry.so';

export default function basicTypeArray() {
  describe("basic_type_array_test", () => {
    it("RunArray", DEFAULT, () => {
      const basic_types_array: basic_types_array = testNapi.basic_types_array;

      const array = basic_types_array.createArray();
      expect(basic_types_array.getLength(array)).assertEqual(0);

      const arrayWithLength = basic_types_array.createArray(10);
      expect(basic_types_array.getLength(arrayWithLength)).assertEqual(10);

      basic_types_array.set(array, 0, 10);
      basic_types_array.set(array, 1, "test");
      basic_types_array.set(array, 2, 3.0);

      expect(basic_types_array.getLength(array)).assertEqual(3);

      expect(basic_types_array.get(array, 0)).assertEqual(10);
      expect(basic_types_array.get(array, 1)).assertEqual("test");
      expect(basic_types_array.get(array, 2)).assertEqual(3.0);

      basic_types_array.set(array, 0, 5);

      expect(basic_types_array.get(array, 0)).assertEqual(5);

      expect(basic_types_array.get(array, 5)).assertUndefined();
    })
  })
}