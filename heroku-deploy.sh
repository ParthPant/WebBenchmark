#!bin/sh

heroku container:login
heroku container:push -a pp-profiler --recursive
heroku container:release -a pp-profiler server redis