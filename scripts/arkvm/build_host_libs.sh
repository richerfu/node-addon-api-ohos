#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
REPO_ROOT="$(cd -- "${SCRIPT_DIR}/../.." &>/dev/null && pwd)"

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "ArkVM host libraries must be built on Linux" >&2
  exit 1
fi

ARK_HOST_BUNDLE_DIR="${ARK_HOST_BUNDLE_DIR:-${ARK_HOST_TOOLS_DIR:-}}"
ARK_ACE_NAPI_LIB="${ARK_ACE_NAPI_LIB:-${ARK_HOST_BUNDLE_DIR}/libace_napi.so}"
TARGET_RELEASE_DIR="${TARGET_RELEASE_DIR:-${REPO_ROOT}/target/arkvm-host/release}"
BUILD_DIR="${ARKVM_HOST_BUILD_DIR:-${REPO_ROOT}/example/build-arkvm-host}"
NATIVE_API_INCLUDE_DIR="${ARK_NATIVE_API_INCLUDE_DIR:-${BUILD_DIR}/native-api-headers}"

if [[ -z "${ARK_HOST_BUNDLE_DIR}" ]]; then
  echo "ARK_HOST_TOOLS_DIR or ARK_HOST_BUNDLE_DIR is required" >&2
  exit 1
fi

if [[ ! -f "${ARK_ACE_NAPI_LIB}" ]]; then
  echo "ARK_ACE_NAPI_LIB not found: ${ARK_ACE_NAPI_LIB}" >&2
  exit 1
fi

if [[ -z "${OHOS_NDK_HOME:-}" ]]; then
  echo "OHOS_NDK_HOME is required for native_api.h headers" >&2
  exit 1
fi

rm -rf "${NATIVE_API_INCLUDE_DIR}"
mkdir -p "${NATIVE_API_INCLUDE_DIR}"
cp -R "${OHOS_NDK_HOME}/native/sysroot/usr/include/napi" "${NATIVE_API_INCLUDE_DIR}/"
cp -R "${OHOS_NDK_HOME}/native/sysroot/usr/include/info" "${NATIVE_API_INCLUDE_DIR}/"
cp "${OHOS_NDK_HOME}/native/sysroot/usr/include/node_api.h" "${NATIVE_API_INCLUDE_DIR}/"
cp "${OHOS_NDK_HOME}/native/sysroot/usr/include/node_api_types.h" "${NATIVE_API_INCLUDE_DIR}/"
cp "${OHOS_NDK_HOME}/native/sysroot/usr/include/js_native_api.h" "${NATIVE_API_INCLUDE_DIR}/"
cp "${OHOS_NDK_HOME}/native/sysroot/usr/include/js_native_api_types.h" "${NATIVE_API_INCLUDE_DIR}/"

cmake -S "${REPO_ROOT}/example" -B "${BUILD_DIR}" \
  -DCMAKE_BUILD_TYPE=Release \
  -DNODE_ADDON_API_OHOS_ARKVM_HOST=ON \
  -DARK_HOST_BUNDLE_DIR="${ARK_HOST_BUNDLE_DIR}" \
  -DARK_ACE_NAPI_LIB="${ARK_ACE_NAPI_LIB}" \
  -DARK_NATIVE_API_INCLUDE_DIR="${NATIVE_API_INCLUDE_DIR}"

cmake --build "${BUILD_DIR}" --config Release

mkdir -p "${TARGET_RELEASE_DIR}"
cp "${BUILD_DIR}/libexample.so" "${TARGET_RELEASE_DIR}/libexample.so"
echo "Built ${TARGET_RELEASE_DIR}/libexample.so"
