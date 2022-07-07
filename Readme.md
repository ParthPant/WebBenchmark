![logo](./logo.png)

[www.parthetic.me/Profile](https://www.parthetic.me/Profile)

A webapp that allows you to run benchmarks on C++ functions.

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
    PROFILE("factorial_10", 500, FUNCTION(fact_rec, 10))
    PROFILE("factorial_20", 500, FUNCTION(fact_rec, 20))
    PROFILE("factorial_30", 500, FUNCTION(fact_rec, 30))
    PROFILE("factorial_40", 500, FUNCTION(fact_rec, 40))
}
```

This should produce an output like:
![result](./result.png)