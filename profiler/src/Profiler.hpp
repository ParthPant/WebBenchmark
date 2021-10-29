#pragma once

#include <chrono>
#include <sstream>
#include <string>
#include <fstream>
#include <functional>
#include <algorithm>

#define PROFILE(name, count, func) {\
        Profiler::Get().Profile((name), (count), (func));\
    }
    

class Profiler {
private:
    std::stringstream _outStream;
    std::string _outputPath = "";
    int _objCount = 0;

    typedef struct
    {
        long count;
        long long total;
        std::string name;
    } TimerEntry;

    void MakeEntry(TimerEntry res)
    {
        //std::cout<<"name: "<<res.name<<"\t"<<"count: "<<(int)res.count<<"\t"<<"duration: "<<(float)res.total/res.count<<"us"<<std::endl;
        if (_objCount > 0) {
        _outStream<<",";
        } else {
            WriteHeader();
        }

        _outStream<<"\""<<res.name<<"\":";
        _outStream<<"{";
        _outStream<<"\""<<"count"<<"\""<<":"<<res.count<<",";
        _outStream<<"\""<<"avg"<<"\""<<":"<<(float)res.total/res.count;
        _outStream<<"}";
        
        _objCount++;
    }

    void WriteHeader()
    {
        _outStream<<"{";
    }

    void WriteFooter()
    {
        _outStream<<"}";
        _outStream.flush();
    }

    class Timer {
        using HighResClock = std::chrono::high_resolution_clock;
        TimerEntry _entry = {0};
        std::chrono::system_clock::time_point _start;

    public:
        Timer(std::string const &name)
            :_start(HighResClock::now())
        {
            _entry.name = name;
            std::replace(_entry.name.begin(), _entry.name.end(), ' ', '_');
        }

        void Submit()
        {
            auto end = HighResClock::now();
            long long stop = std::chrono::time_point_cast<std::chrono::microseconds>(end).time_since_epoch().count();
            long long start = std::chrono::time_point_cast<std::chrono::microseconds>(_start).time_since_epoch().count();

            _entry.total += (stop - start);
            _entry.count++;

            _start = HighResClock::now();
        }

        ~Timer()
        {
            Profiler::Get().MakeEntry(_entry);
        }
    };

public:
    template <typename T>
    void Profile(std::string const &name, int const count, T func)
    {
        Timer timer(name);
        for (int i=0; i<count; i++) {
            func();
            timer.Submit();
        }
    }
    
    void SetOutputPath(std::string const &file) {
        _outputPath = file;
    }

    ~Profiler() {
        WriteFooter();
        if (_outputPath == "")
            _outputPath = "output.json";
        std::fstream ofs(_outputPath, std::fstream::out);
        ofs<<_outStream.str();
        ofs.close();
    }

    static Profiler& Get()
    {
        static Profiler _instance;
        return _instance;
    }
};
