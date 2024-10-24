#!/bin/bash

script_dir=$(dirname "$0")

script_dir=$(cd "$script_dir" && pwd)

parent_dir=$(dirname "$script_dir")

pushd $parent_dir/example

rm -rf build

mkdir build && pushd build

cmake -DOHOS_STL=c++_shared -DOHOS_ARCH=arm64-v8a ../

cmake --build ./

popd

cp $parent_dir/example/build/libexample.so $parent_dir/ohos_addon_example/entry/libs/arm64-v8a
cp $OHOS_NDK_HOME/native/llvm/lib/aarch64-linux-ohos/libc++_shared.so $parent_dir/ohos_addon_example/entry/libs/arm64-v8a