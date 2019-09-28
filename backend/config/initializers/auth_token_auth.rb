RailsJwtAuth.setup do |config|
    config.auth_field_name = 'username'

    config.simultaneous_sessions = 1000
end