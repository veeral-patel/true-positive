class Group < ApplicationRecord
    acts_as_tenant :tenant

    validates :name, presence: true

    has_many :group_users, dependent: :destroy
    has_many :users, through: :group_users

    def user_count
        self.users.count
    end
end
