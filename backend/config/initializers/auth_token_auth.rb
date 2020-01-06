RailsJwtAuth.setup do |config|
    config.auth_field_name = 'username'

    config.simultaneous_sessions = 1000

    if Rails.env === "development"
        config.invitations_url = "http://localhost:3000"
    elsif Rails.env === "production"
        config.invitations_url = "https://console.truepositive.app"
    end
end