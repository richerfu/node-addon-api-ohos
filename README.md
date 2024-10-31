# node-addon-api-ohos

![Platform](https://img.shields.io/badge/platform-arm64/arm/x86__64-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![Ohpm Version](https://img.shields.io/badge/OhpmVersion-0.0.1-green)

`node-addon-api` for OpenHarmony/HarmonyNext.

We've made some Harmony-specific adaptations based on [node-addon-api](https://github.com/nodejs/node-addon-api), with the aim of providing the same development experience on the Harmony platform.

## Usage

### Install

```shell
ohpm install @ohos-rs/node-addon-api --save-dev
```

### Setup

Edit your `CMakeLists.txt` in your project and add those code:

```CMakeLists.txt
set(NODE_ADDON_API_OHOS_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules/@ohos-rs/node-addon-api)
set(CMAKE_MODULE_PATH ${NODE_ADDON_API_OHOS_ROOT_PATH})

find_package(node_addon_api_ohos REQUIRED)

target_link_libraries(entry PRIVATE node_addon_api_ohos)
```

## Environment

For node-addon-api-ohos, we acccepted the following environment variables:

| Name                        | Description                         | Default Value |
| --------------------------- | ----------------------------------- | ------------- |
| NAPI_CPP_EXCEPTIONS         | Allow catch the cpp exception       | true          |
| NAPI_DISABLE_CPP_EXCEPTIONS | Disable catch the cpp exception     | false         |
| NAPI_NORMAL                 | Hidden some APIs or cases for Harmony | true          |

## Build

You can release package locally. Just run command:

```shell
bash ./scripts/release.sh
```

It will generate a `.har` package in current path. You can import it with `file` protocol.

## Community

- [ohos-rs](https://github.com/ohos-rs/ohos-rs)
