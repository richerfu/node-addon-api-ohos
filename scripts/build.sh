#!/bin/bash

script_dir=$(dirname "$0")

script_dir=$(cd "$script_dir" && pwd)

parent_dir=$(dirname "$script_dir")

cd $parent_dir/example

rm -rf build

mkdir build && pushd build

cmake -DOHOS_STL=c++_shared -DOHOS_ARCH=arm64-v8a ../

cmake --build ./