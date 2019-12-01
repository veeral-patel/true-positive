class ApiToken < ApplicationRecord
    validates :name, presence: true
    validates :api_token, presence: true
    validates :user, presence: true

    belongs_to :user
end