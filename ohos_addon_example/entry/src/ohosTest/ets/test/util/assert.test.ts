import { expect } from "./framework.test";

function createAssert() {
  function assert(condition) {
    expect(condition).assertEqual(true);
  }

  assert.ok = function (condition, message) {
    if (!condition) {
      throw new Error(message || "Assertion failed");
    }
  };

  assert.strictEqual = (act, expectValue) => {
    expect(act).assertEqual(expectValue);
  };

  assert.notStrictEqual = (act, expectValue) => {
    expect(act).not().assertEqual(expectValue);
  };

  assert.deepStrictEqual = (act, expectValue) => {
    expect(act).assertDeepEquals(expectValue);
  };

  assert.throws = (fn, expected) => {
    expect(fn).assertThrowError(expected);
  };

  assert.ok = (act) => {
    expect(!!act).assertEqual(true);
  };
  assert.equal = (act, expectValue) => {
    expect(act).assertEqual(expectValue);
  };

  return assert;
}

const assert = createAssert();

export default assert;
