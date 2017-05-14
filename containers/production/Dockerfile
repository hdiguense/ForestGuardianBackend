# Explicitely indicate the mainteiner 'library'.
FROM library/ruby:2.3.3
# Set rails environment to production.
RUN export RAILS_ENV=production
# TODO: Better lock versions.
RUN apt-get update && apt-get install -y build-essential libpq-dev nodejs --no-install-recommends
# Free space used by apt-get.
RUN rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/ForestGuardian/ForestGuardianBackend.git

WORKDIR /ForestGuardianBackend

# Install gems.
RUN bundle install

RUN RAILS_ENV=production DB_ADAPTER=nulldb rake assets:precompile

# This ARG can be used to invalidate docker cache.
ARG CACHE_DATE=0

RUN git pull

# Install gems.
RUN bundle install

RUN RAILS_ENV=production DB_ADAPTER=nulldb rake assets:precompile
RUN mkdir -p /ForestGuardianBackend/tmp/pids