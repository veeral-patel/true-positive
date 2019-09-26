class SessionsController < RailsJwtAuth::SessionsController
    skip_before_action :authenticate_user
end