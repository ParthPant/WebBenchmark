rm -r *

echo "copying source.."
cp -r /code/src /app/
cp /code/Makefile /app/

echo "compiling.."
if make; then
    chmod -R 777 bin/myapp

    echo "executing.."
    bin/myapp -o /out/output.json

    echo "done."
    exit 1
else
    echo "error while compiling"
    exit 100
fi