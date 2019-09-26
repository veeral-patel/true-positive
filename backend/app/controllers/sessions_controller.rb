class SessionsController < RailsJwtAuth::SessionsController
    skip_before_action :authenticate!
end