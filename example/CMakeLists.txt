cmake_minimum_required(VERSION 3.29)
project(example)

set(CMAKE_CXX_STANDARD 17)

add_library(example SHARED napi_init.cpp)
target_include_directories(example PUBLIC ${NODE_ADDON_API})
target_link_libraries(example node_addon_api_ohos libace_napi.z.so)
