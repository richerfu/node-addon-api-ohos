cmake_minimum_required(VERSION 3.29)

include($ENV{OHOS_NDK_HOME}/native/build/cmake/ohos.toolchain.cmake)

project(node_addon_api_ohos)

set(CMAKE_CXX_STANDARD 17)

set(NODE_ADDON_API "${CMAKE_CURRENT_SOURCE_DIR}")

add_library(node_addon_api_ohos INTERFACE)
target_include_directories(node_addon_api_ohos INTERFACE napi.h napi-inl.h napi-inl.deprecated.h)

add_subdirectory(example)