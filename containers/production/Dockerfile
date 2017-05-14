# Explicitely indicate the mainteiner 'library'.
FROM library/ruby:2.3.3

# TODO: Better lock versions.
RUN apt-get update && apt-get install -y build-essential libpq-dev nodejs imagemagick --no-install-recommends
# Free space used by apt-get.
RUN rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/ForestGuardian/ForestGuardianBackend.git

WORKDIR /ForestGuardianBackend

ARG RAILS_ENV
ARG AWS_ACCESS_KEY_ID
ARG AWS_ACCESS_KEY_KEY
ARG AWS_REGION

# Install gems.
RUN bundle install

RUN DB_ADAPTER=nulldb rake assets:precompile

# This ARG can be used to invalidate docker cache.
ARG CACHE_DATE=0

RUN git pull

# Install gems.
RUN bundle install

RUN DB_ADAPTER=nulldb rake assets:precompile
RUN mkdir -p /ForestGuardianBackend/tmp/pids