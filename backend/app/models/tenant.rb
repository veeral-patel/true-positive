class Tenant < ApplicationRecord
    validates :name, presence: true
end
