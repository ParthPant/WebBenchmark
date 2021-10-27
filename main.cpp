#include <iostream>
#include "Profiler.hpp"

int fact(int n) {
    if (n == 1) return 1;
    if (n < 1) return -1;
    return n*fact(n-1);
}

int main() {
    Timer timer("Factorial 1000"); 
    for (int i=0; i<300; i++) {
        fact(1000);
        timer.submit();
    }

    Timer timer1("Factorial 100"); 
    for (int i=0; i<300; i++) {
        fact(100);
        timer1.submit();
    }
}
