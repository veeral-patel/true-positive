class ApplicationController < ActionController::API
    include RailsJwtAuth::AuthenticableHelper
    include Pundit

    before_action :authenticate_user

    def authenticate_user
        token_from_request = request.env['HTTP_AUTHORIZATION']&.split&.last

        if token_from_request.size == 40
            authenticate_user_api(token_from_request)
        else
            authenticate_user_ui
        end 
    end

    def authenticate_user_ui
        begin
            self.authenticate!
        rescue RailsJwtAuth::NotAuthorized
            render json: { "error": "You are not authenticated." }, status: 401
        end
    end

    def authenticate_user_api(token_from_request)
        begin
            # determine if the provided API token exists in the database
            existing_token = ApiToken.find_by!(api_token: token_from_request)

            # if it exists, set `current_user` to the user who created it
            @current_user = existing_token.user
        rescue ActiveRecord::RecordNotFound
            # if the provided API token doesn't exist in the database,
            # then return a 401 HTTP response
            render json: { "error": "API token is invalid" }, status: 401
        end
    end
end
    
