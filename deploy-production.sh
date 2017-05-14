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
    fg_activate_machine
    cd containers/production
    # --build-arg CACHE_DATE=$(date) forces docker to build the image after a particular step.
    docker build --build-arg CACHE_DATE=$(date +%s) -t forestguardian/backend .
    docker push forestguardian/backend
    cd ../..
    docker-compose -f docker-compose-production.yml up -d redis db
    # waits for database to be initialized.
    sleep 10
    # setup database
    RAILS_ENV=production docker-compose -f docker-compose-production.yml run web bundle exec rake db:create
    RAILS_ENV=production docker-compose -f docker-compose-production.yml run web bundle exec rake db:schema:load
    RAILS_ENV=production docker-compose -f docker-compose-production.yml run web bundle exec rake db:migrate
    RAILS_ENV=production docker-compose -f docker-compose-production.yml run web bundle exec rake db:seed
    # start services that depend on db
    docker-compose -f docker-compose-production.yml up -d sidekiq web
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