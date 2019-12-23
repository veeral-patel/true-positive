class Audit < ApplicationRecord
    enum associated_type: { CASE: 1 }
    enum action: {
        CREATE_CASE: 1,
        CREATE_TASK: 2,
        CREATE_INDICATOR: 3
    }

    validates :action, presence: true
    validates :associated_id, presence: true
    validates :created_by, presence: true

    belongs_to :created_by, :class_name => 'User'

    def self.case_relevant_audits
        [
            "CREATE_CASE"
        ]
    end

    def self.task_relevant_audits
        [
            "CREATE_TASK"
        ]
    end

    def self.indicator_relevant_audits
        [
            "CREATE_INDICATOR"
        ]
    end

    def readable_message
        if self.action == "CREATE_CASE"
            "#{self.created_by.username} created the case"
        elsif self.action == "CREATE_TASK"
            "#{self.created_by.username} added a task"
        elsif self.action == "CREATE_INDICATOR"
            "#{self.created_by.username} added an indicator"
        else
            "This audit entry lacks a human-readable message."
        end
    end
end
