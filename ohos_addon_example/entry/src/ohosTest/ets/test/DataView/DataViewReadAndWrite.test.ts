import { describe, it, DEFAULT } from '../util/framework.test';
import binding from '../util/binding';
import assert from '../util/assert.test';

const init = {
  Float32: Float32Array,
  Float64: Float64Array,
  Int8: Int8Array,
  Int16: Int16Array,
  Int32: Int32Array,
  Uint8: Uint8Array,
  Uint16: Uint16Array,
  Uint32: Uint32Array,
}

export default function DataViewReadAndWrite() {
  describe("DataViewReadAndWrite", () => {
    it("RunDataViewReadAndWrite", DEFAULT, () => {
      function expected (type, value) {
        return new (init[type])([value])[0];
      }

      function nativeReadDataView (dataview, type, offset, value?) {
        return binding.dataview_read_write[`get${type}`](dataview,offset);
      }

      function nativeWriteDataView (dataview, type, offset, value?) {
        binding.dataview_read_write[`set${type}`](dataview,offset, value);
      }

      // eslint-disable-next-line no-unused-vars
      function isLittleEndian () {
        const buffer = new ArrayBuffer(2);
        new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
        return new Int16Array(buffer)[0] === 256;
      }

      function jsReadDataView (dataview, type, offset, value?) {
        return dataview[`get${type}`](offset,isLittleEndian());
      }

      function jsWriteDataView (dataview, type, offset, value) {
        dataview[`set${type}`](offset,value, isLittleEndian());
      }

      function testReadData (dataview, type, offset, value) {
        jsWriteDataView(dataview, type, offset, 0);
        assert.strictEqual(jsReadDataView(dataview, type, offset), 0);

        jsWriteDataView(dataview, type, offset, value);
        assert.strictEqual(
          nativeReadDataView(dataview, type, offset), expected(type, value));
      }

      function testWriteData (dataview, type, offset, value) {
        jsWriteDataView(dataview, type, offset, 0);
        assert.strictEqual(jsReadDataView(dataview, type, offset), 0);

        nativeWriteDataView(dataview, type, offset, value);
        assert.strictEqual(
          jsReadDataView(dataview, type, offset), expected(type, value));
      }

      function testInvalidOffset (dataview, type, offset, value) {
        // TODO: napi_throw will convert RangeError to Error
        assert.throws(() => {
          nativeReadDataView(dataview, type, offset);
        }, RangeError);

        assert.throws(() => {
          nativeWriteDataView(dataview, type, offset, value);
        }, RangeError);
      }

      const dataview = new DataView(new ArrayBuffer(22));

      testReadData(dataview, 'Float32', 0, 10.2);
      testReadData(dataview, 'Float64', 4, 20.3);
      testReadData(dataview, 'Int8', 5, 120);
      testReadData(dataview, 'Int16', 7, 15000);
      testReadData(dataview, 'Int32', 11, 200000);
      testReadData(dataview, 'Uint8', 12, 128);
      testReadData(dataview, 'Uint16', 14, 32768);
      testReadData(dataview, 'Uint32', 18, 1000000);

      testWriteData(dataview, 'Float32', 0, 10.2);
      testWriteData(dataview, 'Float64', 4, 20.3);
      testWriteData(dataview, 'Int8', 5, 120);
      testWriteData(dataview, 'Int16', 7, 15000);
      testWriteData(dataview, 'Int32', 11, 200000);
      testWriteData(dataview, 'Uint8', 12, 128);
      testWriteData(dataview, 'Uint16', 14, 32768);
      testWriteData(dataview, 'Uint32', 18, 1000000);

      testInvalidOffset(dataview, 'Float32', 22, 10.2);
      testInvalidOffset(dataview, 'Float64', 22, 20.3);
      testInvalidOffset(dataview, 'Int8', 22, 120);
      testInvalidOffset(dataview, 'Int16', 22, 15000);
      testInvalidOffset(dataview, 'Int32', 22, 200000);
      testInvalidOffset(dataview, 'Uint8', 22, 128);
      testInvalidOffset(dataview, 'Uint16', 22, 32768);
      testInvalidOffset(dataview, 'Uint32', 22, 1000000);
    })
  })
}