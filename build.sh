#!/bin/bash

rm -rf build

mkdir build && pushd build

cmake -DOHOS_STL=c++_shared -DOHOS_ARCH=arm64-v8a  ../

cmake --build ./