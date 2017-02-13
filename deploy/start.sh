#/bin/bash
rm -f tmp/pids/server.pid;
rake db:setup;
rake db:migrate;
bundle exec rails s -p 3000 -b '0.0.0.0'
