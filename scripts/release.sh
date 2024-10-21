#!/bin/bash

script_dir=$(dirname "$0")

script_dir=$(cd "$script_dir" && pwd)

parent_dir=$(dirname "$script_dir")

cd $parent_dir

cp -r ./include ./package
tar -zcvf package.har package/