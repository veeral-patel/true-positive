class ApplicationController < ActionController::API
    include RailsJwtAuth::AuthenticableHelper

    before_action :authenticate!
end
