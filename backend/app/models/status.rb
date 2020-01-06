class Status < ApplicationRecord
    acts_as_tenant :tenant

    include SetAsPrimary
    set_as_primary :default_status, owner_key: :tenant, force_primary: false

    validates :name, presence: true

    validates_uniqueness_to_tenant :name

    def to_s
        self.name
    end

    def self.default_status
        # Retrieves our tenant's default tenant (or returns nil if there's no default status)
        Status.find_by(default_status: true)
    end
end
