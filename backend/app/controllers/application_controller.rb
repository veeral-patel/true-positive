class ApplicationController < ActionController::API
    include RailsJwtAuth::AuthenticableHelper
    include Pundit

    before_action :authenticate_user

    def authenticate_user
        begin
            self.authenticate!
        rescue RailsJwtAuth::NotAuthorized
            render json: { "error": "You are not authenticated." }, status: 401
        end
    end
end
    
