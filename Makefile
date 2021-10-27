CC=clang++
CFLAGS=-Wall
APPNAME=myapp
ENTRYPOINT=main.cpp
OUT_DIR=bin/

all: $(APPNAME)

$(APPNAME): $(ENTRYPOINT)
	mkdir -p bin
	$(CC) $(CFLAGS) -o $(OUT_DIR)$@ $^

clean:
	rm -r $(OUT_DIR)

rebuild: clean all
