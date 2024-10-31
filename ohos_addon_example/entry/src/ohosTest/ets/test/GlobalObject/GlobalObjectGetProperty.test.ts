import { describe, it, DEFAULT } from '../util/framework.test';
import binding from '../util/binding';
import assert from '../util/assert.test';

export default function testCase() {
  describe("GlobalObjectGetProperty", () => {
    it("RunGlobalObjectGetProperty", DEFAULT, () => {
      const KEY_TYPE = {
        C_STR: 'KEY_AS_C_STRING',
        CPP_STR: 'KEY_AS_CPP_STRING',
        NAPI: 'KEY_AS_NAPI_VALUES',
        INT_32: 'KEY_AS_INT_32_NUM'
      };

      binding.globalObject.createMockTestObject();
      function assertGlobalObjectPropertyIs (key, attribute, keyType) {
        let napiObjectAttr;
        switch (keyType) {
          case KEY_TYPE.NAPI:
            napiObjectAttr = binding.globalObject.getPropertyWithNapiValue(key);
            assert.deepStrictEqual(attribute, napiObjectAttr);
            break;

          case KEY_TYPE.C_STR:
            napiObjectAttr = binding.globalObject.getPropertyWithCString(key);
            assert.deepStrictEqual(attribute, napiObjectAttr);
            break;

          case KEY_TYPE.CPP_STR:
            napiObjectAttr = binding.globalObject.getPropertyWithCppString(key);
            assert.deepStrictEqual(attribute, napiObjectAttr);
            break;

          case KEY_TYPE.INT_32:
            napiObjectAttr = binding.globalObject.getPropertyWithInt32(key);
            assert.deepStrictEqual(attribute, napiObjectAttr);
            break;
        }
      }

      function assertErrMessageIsThrown (propertyFetchFunction, errMsg) {
        assert.throws(() => {
          propertyFetchFunction(undefined);
        }, errMsg);
      }

      // @ts-ignore
      assertGlobalObjectPropertyIs('2', global['2'], KEY_TYPE.NAPI);
      // @ts-ignore
      assertGlobalObjectPropertyIs('c_str_key', global.c_str_key, KEY_TYPE.C_STR);
      // @ts-ignore
      assertGlobalObjectPropertyIs('cpp_string_key', global.cpp_string_key, KEY_TYPE.CPP_STR);
      // @ts-ignore
      assertGlobalObjectPropertyIs('circular', global.circular, KEY_TYPE.CPP_STR);
      // @ts-ignore
      assertGlobalObjectPropertyIs(15, global['15'], KEY_TYPE.INT_32);

      assertErrMessageIsThrown(binding.globalObject.getPropertyWithCString, 'Error: A string was expected');
      assertErrMessageIsThrown(binding.globalObject.getPropertyWithCppString, 'Error: A string was expected');
      assertErrMessageIsThrown(binding.globalObject.getPropertyWithInt32, 'Error: A number was expected');
    })
  })
}