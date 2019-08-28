class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } , uniqueness: true

    has_many :case_members
    has_many :accessible_cases, :through => :case_members

    def to_s
        self.username
    end

    def created_cases
        Case.where(created_by: self)
    end
end
