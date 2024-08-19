# the minimum version of CMake.
cmake_minimum_required(VERSION 3.5.0)
project(ohos_addon_exampl)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})
set(NODE_ADDON_API "${CMAKE_CURRENT_SOURCE_DIR}/../../../../..")
set(EXAMPLE_DIR "${NODE_ADDON_API}/example")

file(GLOB_RECURSE SOURCES
        "${EXAMPLE_DIR}/*.cpp"
        "${EXAMPLE_DIR}/*.h"
        "${EXAMPLE_DIR}/basic_types/*.cpp"
        "${EXAMPLE_DIR}/dataview/*.cpp"
        "${EXAMPLE_DIR}/object/*.cpp"
        "${EXAMPLE_DIR}/threadsafe_function/*.cpp"
        "${EXAMPLE_DIR}/typed_threadsafe_function/*.cpp"
)

if(DEFINED PACKAGE_FIND_FILE)
    include(${PACKAGE_FIND_FILE})
endif()

include_directories(${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

add_library(entry SHARED ${SOURCES} napi_init.cpp)
target_include_directories(entry PUBLIC ${NODE_ADDON_API})
target_link_libraries(entry PUBLIC libace_napi.z.so)
