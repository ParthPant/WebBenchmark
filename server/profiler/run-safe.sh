#!/bin/bash

rm -rf bin

echo "compiling.."
make > output/log 2>&1

if [ $? -eq 0 ]; then
    chmod -R 777 bin/myapp

    echo "executing.."
    OUTPUT=$(sudo -u nobody timeout 5s bin/myapp -o output/should_not_exist.json)
    EXIT=$?

    echo "transferring output.."
    echo $OUTPUT > output/output.json

    if [ $EXIT -eq 124 ]; then
        echo "timout."
    else
        echo "done."
    fi

    exit $EXIT 
else
    echo "error while compiling"
    exit 100
fi