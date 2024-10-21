if(NOT NODE_ADDON_API_OHOS_ROOT_PATH)
    message(FATAL_ERROR "-- [NODE_ADDON_API_OHOS]: NODE_ADDON_API_OHOS_ROOT_PATH must be setted up at first.")
endif()

set(NODE_ADDON_API_OHOS_SEARCH_PATH ${NODE_ADDON_API_OHOS_ROOT_PATH})

find_path(NODE_ADDON_API_OHOS_PATH
    NAMES napi.h
    PATHS
        ${NODE_ADDON_API_OHOS_SEARCH_PATH}/include
    CMAKE_FIND_ROOT_PATH_BOTH
)

if(NOT NODE_ADDON_API_OHOS_INCLUDE_DIR)
    find_path(NODE_ADDON_API_OHOS_INCLUDE_DIR
        NAMES napi.h
        PATHS ${NODE_ADDON_API_OHOS_PATH}
        PATH_SUFFIXES include
        CMAKE_FIND_ROOT_PATH_BOTH
    )

    set(NODE_ADDON_API_OHOS_INCLUDE_DIR
        ${NODE_ADDON_API_OHOS_INCLUDE_DIR})
endif()

include(FindPackageHandleStandardArgs)
find_package_handle_standard_args(node_addon_api_ohos DEFAULT_MSG NODE_ADDON_API_OHOS_INCLUDE_DIR)

if(node_addon_api_ohos_FOUND)
    set(NODE_ADDON_API_OHOS_INCLUDE_DIRS ${NODE_ADDON_API_OHOS_INCLUDE_DIR})
    if(NOT TARGET node_addon_api_ohos)
        add_library(node_addon_api_ohos INTERFACE IMPORTED)
        set_target_properties(node_addon_api_ohos PROPERTIES
            INTERFACE_INCLUDE_DIRECTORIES "${NODE_ADDON_API_OHOS_INCLUDE_DIRS}"
        )
    endif()
endif()

mark_as_advanced(NODE_ADDON_API_OHOS_INCLUDE_DIR)