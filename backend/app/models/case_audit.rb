class CaseAudit < ApplicationRecord
    # Remember: if you change the name of an action in this enum, update the readable_message
    # function below as well.
    enum action: {
        CREATE_CASE: 1,
        CREATE_TASK: 2,
        CREATE_INDICATOR: 3,
        ADD_MEMBER_TO_CASE: 4,
        REMOVE_MEMBER_FROM_CASE: 5,
        DELETE_TASK: 6,
        CREATE_TASK_GROUP: 7,
        CREATE_COMMENT: 8
    }

    validates :action, presence: true
    validates :created_by, presence: true

    belongs_to :created_by, :class_name => 'User'

    def readable_message
        if self.action == "CREATE_CASE"
            "#{self.created_by.username} created the case"
        elsif self.action == "CREATE_TASK"
            "#{self.created_by.username} added a task"
        elsif self.action == "CREATE_INDICATOR"
            "#{self.created_by.username} added an indicator"
        elsif self.action == "ADD_MEMBER_TO_CASE"
            "#{self.created_by.username} added a member"
        elsif self.action == "REMOVE_MEMBER_FROM_CASE"
            "#{self.created_by.username} removed a member"
        elsif self.action == "DELETE_TASK"
            "#{self.created_by.username} deleted a task"
        elsif self.action == "CREATE_TASK_GROUP"
            "#{self.created_by.username} created a task group"
        elsif self.action == "CREATE_COMMENT"
            "#{self.created_by.username} added a comment"
        else
            "This audit entry lacks a human-readable message."
        end
    end
end
