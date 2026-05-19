# ArkVM Tests

These tests run the node-addon-api OHOS wrapper against ArkVM on Linux host.

Required environment:

- `OHOS_NDK_HOME`, from the OpenHarmony SDK setup action.
- `ARK_HOST_TOOLS_DIR` or `ARK_HOST_BUNDLE_DIR`, containing `es2abc`, `ark_js_napi_cli`, and `libace_napi.so`.

Commands:

```bash
bash scripts/arkvm/build_host_libs.sh
bash scripts/arkvm/run_tests.sh
```

Unsupported OHOS APIs such as `Napi::Symbol` and `MemoryManagement` are intentionally not covered here.
