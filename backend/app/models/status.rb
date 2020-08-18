class Status < ApplicationRecord
    include SetAsPrimary
    set_as_primary :default_status, force_primary: false

    validates :name, presence: true

    def to_s
        self.name
    end

    def self.default_status
        # Retrieves our default status (or returns nil if there's no default status)
        Status.find_by(default_status: true)
    end
end
