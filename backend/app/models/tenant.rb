class Tenant < ActiveRecord::Base
    validates :name, presence: true
end
