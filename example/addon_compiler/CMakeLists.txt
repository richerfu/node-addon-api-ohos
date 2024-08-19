cmake_minimum_required(VERSION 3.29)
project(example)

set(CMAKE_CXX_STANDARD 17)

set(EXAMPLE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/..")

file(GLOB_RECURSE SOURCE
        "${EXAMPLE_DIR}/*.cpp"
        "${EXAMPLE_DIR}/*.h"
        "${EXAMPLE_DIR}/basic_types/*.cpp"
        "${EXAMPLE_DIR}/dataview/*.cpp"
        "${EXAMPLE_DIR}/object/*.cpp"
        "${EXAMPLE_DIR}/threadsafe_function/*.cpp"
        "${EXAMPLE_DIR}/typed_threadsafe_function/*.cpp"
)

add_library(example SHARED ${SOURCE} napi_init.cpp)

target_include_directories(example PUBLIC ${NODE_ADDON_API})
target_link_libraries(example libace_napi.z.so)
