FROM postgres:9.5

MAINTAINER Azavea <systems@azavea.com>

ENV POSTGIS_MAJOR 2.2

RUN \
      apt-get update && apt-get install -y --no-install-recommends \
              postgresql-9.5-postgis-2.2\
              postgresql-9.5-postgis-2.2-scripts \
      && rm -rf /var/lib/apt/lists/*
