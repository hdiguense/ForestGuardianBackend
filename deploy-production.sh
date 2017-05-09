#!/usr/bin/env bash

function fg_activate_machine {
   eval $(docker-machine env forestguardian)
}

function fg_clean {
   fg_activate_machine
   docker-compose -f docker-compose-production.yml down
   docker volume rm $(docker volume ls -f dangling=true -q)
}

function fg_start {
    set -x
    fg_activate_machine
    docker-compose -f docker-compose-production.yml build
    docker-compose -f docker-compose-production.yml up -d redis db
    sleep 10
    RAILS_ENV=production docker-compose -f docker-compose-production.yml run web bundle exec rake db:create
    RAILS_ENV=production docker-compose -f docker-compose-production.yml run web bundle exec rake db:schema:load
    RAILS_ENV=production docker-compose -f docker-compose-production.yml run web bundle exec rake db:migrate
    RAILS_ENV=production docker-compose -f docker-compose-production.yml run web bundle exec rake db:seed
    docker-compose -f docker-compose-production.yml up -d sidekiq web
    set +x
}

function fg_reload {
    fg_activate_machine
    docker-compose -f docker-compose-production.yml stop web
    docker-compose -f docker-compose-production.yml build web
    docker-compose -f docker-compose-production.yml up -d web
}

function fg_ip {
    fg_activate_machine
    docker-machine ip forestguardian
}