# node-addon-api-ohos

An example for harmony to use `node-addon-api` to generate native module.

## Normal

Just for Harmony, we have already hidden `Symbol` and `napi_adjust_external_memory`. If you want to use it, you can define a variable `NAPI_NORMAL`.

## Build

Try to run:

```shell
bash ./build.sh
```

You can get `libexample.so` in `build/example/`.