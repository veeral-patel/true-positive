class ApplicationController < ActionController::API
    set_current_tenant_through_filter

    include RailsJwtAuth::AuthenticableHelper
    include Pundit

    before_action :authenticate_user
    before_action :set_tenant

    def set_tenant
        tenant_identifier = request.env['HTTP_TENANT_IDENTIFIER']

        if tenant_identifier.nil?
            render json: { "message": "Please include a Tenant_Identifier header with your tenant's identifier." }
            return
        else
            begin
                tenant = Tenant.find_by!(identifier: tenant_identifier)
                set_current_tenant(tenant)
            rescue ActiveRecord::RecordNotFound
                render json: { "message": "No tenant has the identifier provided in your Tenant_Identifier header." }
                return
            end
        end
    end

    def authenticate_user
        token_from_request = request.env['HTTP_AUTHORIZATION']&.split&.last

        if token_from_request.nil?
            render json: { "message": "Please provide an API token in your request's Authorization header." }, status: 401
        else
            # Hack: If the provided token is 40 characters, then assume
            # the user is authenticating via the API, the UI otherwise.
            if token_from_request.size == 40
                authenticate_user_api(token_from_request)
            else
                authenticate_user_ui
            end 
        end
    end

    def authenticate_user_ui
        # Authenticate and identify the user if they're logging in through the UI
        # (aka with a JWT).
        begin
            self.authenticate!
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
        rescue ActiveRecord::RecordNotFound
            # if the provided API token doesn't exist in the database,
            # then return a 401 HTTP response
            render json: { "message": "API token is invalid" }, status: 401
        end
    end
end
    
