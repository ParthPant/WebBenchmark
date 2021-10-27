#include <chrono>
#include <iostream>
#include <climits>
#include <string>

class Profiler {
};

class Timer {
    using HighResClock = std::chrono::high_resolution_clock;

    typedef struct {
        long min;
        long max;
        float avg;
        long count;
        long total;
    } EpochResult;

    std::string _name;
    EpochResult res = {INT_MAX, INT_MIN, 0, 0, 0};

    std::chrono::system_clock::time_point _start;

public:
    Timer(std::string const &name)
        :_name(name)
        ,_start(HighResClock::now())
    {
    }

    void submit()
    {
        auto end = HighResClock::now();
        long long stop = std::chrono::time_point_cast<std::chrono::microseconds>(end).time_since_epoch().count();
        long long start = std::chrono::time_point_cast<std::chrono::microseconds>(_start).time_since_epoch().count();

        long dur = stop - start;
        res.min = std::min(dur, res.min);
        res.max = std::max(dur, res.min);

        res.total += (stop - start);
        res.count++;

        _start = HighResClock::now();
    }

    ~Timer()
    {
        res.avg = (float)res.total/(float)res.count;
        std::cout<<"name: "<<_name<<"\t"<<"count: "<<(int)res.count<<"\t"<<"duration: "<<res.avg<<"us"<<std::endl;
        std::cout<<"min: "<<res.min<<"\t"<<"max: "<<res.max<<std::endl;
    }
};
