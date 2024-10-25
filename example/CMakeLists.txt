include($ENV{OHOS_NDK_HOME}/native/build/cmake/ohos.toolchain.cmake)

cmake_minimum_required(VERSION 3.5.0)
project(example)

set(CMAKE_CXX_STANDARD 17)

set(NODE_ADDON_API "${CMAKE_CURRENT_SOURCE_DIR}/../include")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fno-exceptions")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fno-exceptions")

add_compile_definitions(NAPI_DISABLE_CPP_EXCEPTIONS=1)

add_library(node_addon_api_ohos INTERFACE IMPORTED)
target_include_directories(node_addon_api_ohos INTERFACE ${NODE_ADDON_API}/napi.h ${NODE_ADDON_API}/napi-inl.h ${NODE_ADDON_API}/napi-inl.deprecated.h)

file(GLOB_RECURSE
        SOURCES
        "basic_types/*.cpp"
        "dataview/*.cpp"
        "object/*.cpp"
        "threadsafe_function/*.cpp"
        "typed_threadsafe_function/*.cpp"
)

add_library(example SHARED
        addon.cpp
        addon_data.cpp
        common/test_helper.h
        array_buffer.cpp
        async_context.cpp
        async_process_queue_worker.cpp
        async_process_worker.cpp
        async_worker_persistent.cpp
        async_worker.cpp
        bidint.cpp
        buffer_no_external.cpp
        buffer.h
        buffer.cpp
        buffer_new_or_copy-inl.h
        callbackInfo.cpp
        callbackscope.cpp
        date.cpp
        env_cleanup.cpp
        env_misc.cpp
        error_handling_for_primitives.cpp
        error.cpp
        external.cpp
        function_reference.cpp
        function.cpp
        handlescope.cpp
        movable_callbacks.cpp
        name.cpp
        object_reference.cpp
        objectwrap_constructor_exception.cpp
        objectwrap_function.cpp
        objectwrap_multiple_inheritance.cpp
        objectwrap_removewrap.cpp
        objectwrap.cpp
        promise.cpp
        reference.cpp
        thunking_manual.cpp
        type_taggable.cpp
        typedarray.cpp
        value_type_cast.cpp
        version_management.cpp
        ${SOURCES}
        napi_init.cpp
)

target_include_directories(example PUBLIC ${NODE_ADDON_API})
target_link_libraries(example PRIVATE node_addon_api_ohos libace_napi.z.so)
