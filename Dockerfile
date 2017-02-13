FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /ForestGuardianBackend
WORKDIR /ForestGuardianBackend
ADD . /ForestGuardianBackend
RUN rm -R tmp/*
RUN export RAILS_ENV=production
RUN bundle install