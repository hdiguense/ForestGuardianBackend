FROM ruby:2.3.3
RUN export RAILS_ENV=production
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /ForestGuardianBackend
WORKDIR /ForestGuardianBackend
COPY Gemfile /ForestGuardianBackend
COPY Gemfile.lock /ForestGuardianBackend
RUN bundle install
COPY . /ForestGuardianBackend
RUN bundle exec rake assets:precompile