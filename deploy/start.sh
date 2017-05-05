#!/usr/bin/env bash
sleep 5 # wait for postgresql service to start before doing any migration.
rm -f tmp/pids/server.pid;
rake db:setup;
rake db:migrate;
bundle exec rails s -p 80 -b '0.0.0.0'
