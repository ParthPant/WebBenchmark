CC=g++
CFLAGS=-g -Wall
APPNAME=myapp
ENTRYPOINT=main.cpp
OUT_DIR=bin

all: $(OUT_DIR)/$(APPNAME)

$(OUT_DIR)/$(APPNAME): $(ENTRYPOINT)
	mkdir -p $(OUT_DIR)
	$(CC) $(CFLAGS) -o $@ $^

clean:
	rm -r $(OUT_DIR)

rebuild: clean all
