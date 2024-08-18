cmake_minimum_required(VERSION 3.29)
project(addon_build)

set(CMAKE_CXX_STANDARD 17)

add_library(addon_build SHARED addon.cpp)
target_include_directories(addon_build PUBLIC ${NODE_ADDON_API})
target_link_libraries(addon_build node_addon_api_ohos libace_napi.z.so)
