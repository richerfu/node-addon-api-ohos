# `@ohos-rs/node-addon-api`

## Install

use`ohpm` to install package.

```shell
ohpm install @ohos-rs/node-addon-api --save-dev
```

## Usage

```txt
# CMakeLists.txt

set(NODE_ADDON_API_OHOS_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules/@ohos-rs/node-addon-api)
set(CMAKE_MODULE_PATH ${NODE_ADDON_API_OHOS_ROOT_PATH})

find_package(node_addon_api_ohos REQUIRED)

target_link_libraries(entry PRIVATE node_addon_api_ohos)
```