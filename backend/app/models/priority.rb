class Priority < ApplicationRecord
    acts_as_tenant :tenant

    validates :name, presence: true, uniqueness: true

    def to_s
        self.name
    end
end
