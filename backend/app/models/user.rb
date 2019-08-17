class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true

    def to_s
        self.username
    end

    def created_cases
        Case.where(created_by: self)
    end
end
