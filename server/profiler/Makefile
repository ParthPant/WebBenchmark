CC=g++
CFLAGS=-Wall
SRC=src
APPNAME=myapp
ENTRYPOINT=main.cpp
OUT_DIR=bin

all: $(OUT_DIR)/$(APPNAME)

$(OUT_DIR)/$(APPNAME): $(SRC)/$(ENTRYPOINT)
	mkdir -p $(OUT_DIR)
	$(CC) $(CFLAGS) -o $@ $^

clean:
	rm -r $(OUT_DIR)

rebuild: clean all
