#include <iostream>
#include <string>
#include "Profiler.hpp"

namespace APP {
    int fact(int n) {
        if (n == 1) return 1;
        if (n < 1) return -1;
        return n*fact(n-1);
    }

    void run() {
        PROFILE("Factorial 500", 500, std::bind(fact, 500))
        PROFILE("Factorial 1000", 500, std::bind(fact, 1000))
        PROFILE("Factorial 5000", 500, std::bind(fact, 5000))
    }
};

int main(int argc, char* argv[]) {
    std::cout<<argc<<std::endl;
    if (argc > 1 && argc != 3) {
        std::cerr<<"Bad Arguments";
        return -1;
    } else if (argc > 1) {
        if (std::string(argv[1]) == "-o") {
            auto output = std::string(argv[2]);

            if (output.empty()) {
                std::cerr<<"Bad Arguments";
                return -1;
            }

            Profiler::Get().SetOutputPath(output);
        } else {
            std::cerr<<"'"<<std::string(argv[1])<<"'"<<"is not a valid option";
            return -1;
        }
    }

    APP::run();
    return 0;
}

