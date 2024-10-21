# node-addon-api-ohos

`node-addon-api` for OpenHarmony/HarmonyNext.

We've made some Harmony-specific adaptations based on [node-addon-api](https://github.com/nodejs/node-addon-api), with the aim of providing the same development experience on the Harmony platform.

## Usage

### Install

```shell
ohpm install @ohos-rs/node-addon-api -D
```

### Setup

Edit your `CMakeLists.txt` in your project and add those code:

```CMakeLists.txt
set(NODE_ADDON_API_OHOS_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules/@ohos-rs/node-addon-api)
set(CMAKE_MODULE_PATH ${NODE_ADDON_API_OHOS_ROOT_PATH})

find_package(node_addon_api_ohos REQUIRED)

target_link_libraries(entry PRIVATE node_addon_api_ohos)
```