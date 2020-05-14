class Priority < ApplicationRecord
    validates :name, presence: true

    validates_uniqueness_to_tenant :name

    def to_s
        self.name
    end
end
