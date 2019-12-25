class Group < ApplicationRecord
    validates :name, presence: true

    has_many :group_users
    has_many :users, through: :group_users

    def user_count
        self.users.count
    end
end
