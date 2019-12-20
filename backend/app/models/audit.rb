class Audit < ApplicationRecord
    enum associated_type: { CASE: 1 }
    enum action: {
        CREATE_CASE: 1
    }

    validates :action, presence: true
    validates :associated_id, presence: true
    validates :created_by, presence: true

    belongs_to :created_by, :class_name => 'User'

    def self.case_audits
        # Returns the list of audits that a case object cares about.
        # Remember to update this whenever I add a new action!
        [
            "CREATE_CASE"
        ]
    end

    def readable_message
        if self.action == "CREATE_CASE"
            "#{self.created_by.username} created the case"
        else
            "This audit entry lacks a human-readable message."
        end
    end
end
