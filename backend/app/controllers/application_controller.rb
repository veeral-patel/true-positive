class ApplicationController < ActionController::API
    set_current_tenant_through_filter

    include RailsJwtAuth::AuthenticableHelper
    include Pundit

    before_action :authenticate_user
    before_action :handle_disabled

    def authenticate_user
        token_from_request = request.env['HTTP_AUTHORIZATION']&.split&.last

        if token_from_request.nil?
            render json: { "message": "Please provide an API token in your request's Authorization header." }, status: 401
        else
            # Hack: If the provided token is 40 characters, then assume the user is
            # authenticating via the API, the UI otherwise.
            if token_from_request.size == 40
                authenticate_user_api(token_from_request)
            else
                authenticate_user_ui
            end 
        end
    end

    def handle_disabled
        if @current_user.disabled
            render json: {
                "errors": [
                    {
                        "message": "Your user account has been disabled.",
                    }
                ]
            }
            return
        end
    end

    def authenticate_user_ui
        # Authenticate and identify the user if they're logging in through the UI
        # (aka with a JWT).

        begin
            self.authenticate!

            set_current_tenant(@current_user.tenant)
        rescue RailsJwtAuth::NotAuthorized
            render json: { "message": "You are not authenticated." }, status: 401
        end
    end

    def authenticate_user_api(token_from_request)
        # Authenticate and identify the user if they're using the API.
        begin
            # determine if the provided API token exists in the database
            existing_token = ApiToken.find_by!(api_token: token_from_request)

            # if it exists, set `current_user` to the user who created it
            @current_user = existing_token.user

            # set the tenant as well
            set_current_tenant(@current_user.tenant)
        rescue ActiveRecord::RecordNotFound
            # if the provided API token doesn't exist in the database,
            # then return a 401 HTTP response
            render json: { "message": "API token is invalid" }, status: 401
        end
    end
end
    
