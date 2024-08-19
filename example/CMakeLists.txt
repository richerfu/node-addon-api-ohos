cmake_minimum_required(VERSION 3.29)
project(example)

set(CMAKE_CXX_STANDARD 17)

file(GLOB_RECURSE
        SOURCES
        "basic_types/*.cpp"
        "dataview/*.cpp"
        "object/*.cpp"
        "threadsafe_function/*.cpp"
        "typed_threadsafe_function/*.cpp"
)

add_library(example SHARED
        napi_init.cpp
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
)

target_include_directories(example PUBLIC ${NODE_ADDON_API})
target_link_libraries(example node_addon_api_ohos libace_napi.z.so)
