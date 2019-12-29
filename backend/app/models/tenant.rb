class Tenant < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    validates :subdomain, presence: true, uniqueness: true
end
