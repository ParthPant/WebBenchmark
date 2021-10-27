#include <iostream>
#include <string>
#include "Profiler.hpp"
#include "App.hpp"

int main(int argc, char* argv[]) {
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

    App::Get().Run();
    return 0;
}
