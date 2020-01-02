# Set up Sentry
Raven.configure do |config|
    config.dsn = 'https://5f14b7daac834862ad9d90520e362df6@sentry.io/1869550'
    config.environments = ['production']
end

  