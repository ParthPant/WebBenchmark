#pragma once
#include "Profiler.hpp"

#define FUNCTION(fn, ...) std::bind(&App::fn, this, ## __VA_ARGS__)

class App {
    int fact_rec(int i) {
        if (i <= 0) return -1;
        else if (i == 1) return i;
        else return i * fact_rec(i-1);
    }

    int fact_loop(int i) {
        int res = 1;
        while (i > 1) {
            res *= i;
            i--;
        }
        return res;
    }

public:
    void Run()
    {
        PROFILE("factorial_rec", 500, FUNCTION(fact_rec, 50))
        PROFILE("factorial_loop", 500, FUNCTION(fact_loop, 50))
    }

    static App Get()
    {
        static App instance;
        return instance;
    }
};
