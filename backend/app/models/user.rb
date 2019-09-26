class User < ApplicationRecord
    include RailsJwtAuth::Authenticatable
    # include RailsJwtAuth::Confirmable
    # include RailsJwtAuth::Recoverable
    # include RailsJwtAuth::Trackable
    # include RailsJwtAuth::Invitable

    validates :username, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } , uniqueness: true, presence: true

    def to_s
        self.username
    end

    def created_cases
        Case.where(created_by: self)
    end
end
