Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://172.16.238.11:6379' }
end