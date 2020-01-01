class ApiToken < ApplicationRecord
    validates :name, presence: true
    validates :api_token, presence: true, length: { is: 40 }
    validates :user, presence: true

    validates_uniqueness_to_tenant :api_token

    belongs_to :user
end