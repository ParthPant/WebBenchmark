CC=g++
CFLAGS=-g -Wall
APPNAME=myapp
ENTRYPOINT=main.cpp
OUT_DIR=bin/

all: $(APPNAME)

$(APPNAME): $(ENTRYPOINT)
	mkdir -p $(OUT_DIR)
	$(CC) $(CFLAGS) -o $(OUT_DIR)$@ $^

clean:
	rm -r $(OUT_DIR)

rebuild: clean all
