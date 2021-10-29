#pragma once
#include "Profiler.hpp"

#define FUNCTION(fn, ...) std::bind(&App::fn, this, ## __VA_ARGS__)

class App {
    int fact(int i) {
        if (i <= 0) return -1;
        else if (i == 1) return i;
        else return i * fact(i-1);
    }

public:
    void Run()
    {
        PROFILE("factorial", 500, FUNCTION(fact, 50))
    }

    static App Get()
    {
        static App instance; 
        return instance;
    }
};
