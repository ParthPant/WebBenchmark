rm -r *

echo "copying source.."
cp -r /code/src /app/
cp /code/Makefile /app/

echo "compiling.."
if make; then
    chmod -R 777 bin/myapp

    echo "executing.."
    timeout 5s bin/myapp -o /out/output.json
    EXIT=$?

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
