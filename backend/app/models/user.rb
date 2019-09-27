class User < ApplicationRecord
    include RailsJwtAuth::Authenticatable

    has_many :created_cases, foreign_key: "created_by_id", class_name: "Case"
    has_many :created_tasks, foreign_key: "created_by_id", class_name: "Task"
    has_many :created_indicators, foreign_key: "created_by_id", class_name: "Indicator"

    validates :username, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } , uniqueness: true, presence: true

    def to_s
        self.username
    end
end
