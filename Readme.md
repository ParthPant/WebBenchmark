![logo](./logo.png)

A webapp that allows you to run benchmarks on C++ functions.

## Run Dev Server
```
git clone https://github.com/ParthPant/Profile.git
docker-compose up
```
Open `localhost:3000` in your browser.

## API Docs:

- You can add member functions to the class App and then run benchmarks on them inside App::Run().
- Use PROFILE('NAME', COUNT, FUNCTION) to run benchmarks on a function.
- Use FUNCTION(func, ...inputs) to supply inputs to a function.
- #include "Profiler.hpp" is necessary to include profiler utilities.
- If your functions take more than 5 seconds to complete execution, they will hit timeout and output return status will be 143.
- Do not take user input in your functions and that you cause timeout since the runner does not provide any input to stdin.

## Example:

For the following function:
```
int fact_loop(int i) {
    int res = 1;
    while (i > 1) {
        res *= i;
        i--;
    }
    return res;
}
```

You can run benchmarks like:
```
 void Run()
{
    PROFILE("factorial_10", 500, FUNCTION(fact_loop, 10))
    PROFILE("factorial_20", 500, FUNCTION(fact_loop, 20))
    PROFILE("factorial_30", 500, FUNCTION(fact_loop, 30))
    PROFILE("factorial_40", 500, FUNCTION(fact_loop, 40))
}
```

This should produce an output like:
![result](./result.png)