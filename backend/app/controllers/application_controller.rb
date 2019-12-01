class ApplicationController < ActionController::API
    include RailsJwtAuth::AuthenticableHelper
    include Pundit

    before_action :authenticate_user_api

    # def authenticate_user_ui
    #     begin
    #         self.authenticate!
    #     rescue RailsJwtAuth::NotAuthorized
    #         render json: { "error": "You are not authenticated." }, status: 401
    #     end
    # end

    def authenticate_user_api
        token_from_request = request.env['HTTP_AUTHORIZATION']&.split&.last

        begin
            existing_token = ApiToken.find_by!(api_token: token_from_request)
            @current_user = existing_token.user
        rescue ActiveRecord::RecordNotFound
            render json: { "error": "API token is invalid" }, status: 401
        end
    end
end
    
