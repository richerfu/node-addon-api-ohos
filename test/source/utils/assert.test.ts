import { markAssertionCall } from "./framework.test";

function fail(message?: string): never {
  throw new Error(message || "Assertion failed");
}

function isArrayBufferLike(value: any): boolean {
  return value instanceof ArrayBuffer || ArrayBuffer.isView(value);
}

function bytes(value: any): Uint8Array {
  if (value instanceof Uint8Array) {
    return value;
  }
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  return new Uint8Array(value as ArrayBuffer);
}

function deepEqual(actual: any, expected: any): boolean {
  if (Object.is(actual, expected)) {
    return true;
  }
  if (isArrayBufferLike(actual) && isArrayBufferLike(expected)) {
    const left = bytes(actual);
    const right = bytes(expected);
    if (left.length !== right.length) {
      return false;
    }
    for (let i = 0; i < left.length; i++) {
      if (left[i] !== right[i]) {
        return false;
      }
    }
    return true;
  }
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) {
      return false;
    }
    for (let i = 0; i < actual.length; i++) {
      if (!deepEqual(actual[i], expected[i])) {
        return false;
      }
    }
    return true;
  }
  if (
    actual !== null &&
    expected !== null &&
    typeof actual === "object" &&
    typeof expected === "object"
  ) {
    const actualKeys = Object.keys(actual);
    const expectedKeys = Object.keys(expected);
    if (actualKeys.length !== expectedKeys.length) {
      return false;
    }
    for (const key of actualKeys) {
      if (!Object.prototype.hasOwnProperty.call(expected, key)) {
        return false;
      }
      if (!deepEqual(actual[key], expected[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function matchesThrown(error: any, expected: any): boolean {
  if (!expected) {
    return true;
  }
  if (typeof expected === "function") {
    if (expected === Error || expected === TypeError || expected === RangeError || expected === SyntaxError) {
      return error instanceof expected;
    }
    return expected(error) === true;
  }
  if (expected instanceof RegExp) {
    return expected.test(String(error && (error.message || error)));
  }
  if (typeof expected === "string") {
    return String(error && (error.message || error)).indexOf(expected) >= 0;
  }
  if (typeof expected === "object") {
    for (const key of Object.keys(expected)) {
      if (!error || error[key] !== expected[key]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

const assert: any = (condition: any, message?: string) => {
  markAssertionCall();
  if (!condition) {
    fail(message);
  }
};

assert.ok = (condition: any, message?: string) => {
  markAssertionCall();
  if (!condition) {
    fail(message);
  }
};

assert.fail = (message?: string) => {
  markAssertionCall();
  fail(message);
};

assert.strictEqual = (actual: any, expected: any, message?: string) => {
  markAssertionCall();
  if (!Object.is(actual, expected)) {
    fail(message || `Expected ${String(actual)} to strictly equal ${String(expected)}`);
  }
};

assert.notStrictEqual = (actual: any, expected: any, message?: string) => {
  markAssertionCall();
  if (Object.is(actual, expected)) {
    fail(message || `Expected ${String(actual)} to differ from ${String(expected)}`);
  }
};

assert.equal = assert.strictEqual;

assert.deepStrictEqual = (actual: any, expected: any, message?: string) => {
  markAssertionCall();
  if (!deepEqual(actual, expected)) {
    fail(message || `Expected deep equality`);
  }
};

assert.deepEqual = assert.deepStrictEqual;

assert.throws = (fn: any, expected?: any, message?: string) => {
  markAssertionCall();
  try {
    fn();
  } catch (err) {
    if (!matchesThrown(err, expected)) {
      fail(message || `Thrown error did not match expectation: ${String(err)}`);
    }
    return err;
  }
  fail(message || "Expected function to throw");
};

assert.doesNotThrow = (fn: any, message?: string) => {
  markAssertionCall();
  try {
    fn();
  } catch (err) {
    fail(message || `Expected function not to throw: ${String(err)}`);
  }
};

export default assert;
