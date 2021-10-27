#pragma once
#include "Profiler.hpp"

#define FUNCTION(fn, ...) std::bind(&App::fn, this, ## __VA_ARGS__)

class App {
    int fact(int i) {
        if (i <= 0) return -1;
        else if (i == 1) return i;
        else return i * fact(i-1);
    }

    int fib(int n) {
        if (n == 0) return 1;
        if (n == 1) return 1;
        return fib(n-1) + fib(n-2);
    }

public:
    void Run()
    {
        PROFILE("fib 10", 10, FUNCTION(fib, 10))
        PROFILE("fib 20", 10, FUNCTION(fib, 20))
        PROFILE("fact 50", 10, FUNCTION(fact, 50))
    }

    static App Get()
    {
        static App instance; 
        return instance;
    }
};
