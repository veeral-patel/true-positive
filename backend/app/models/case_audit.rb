class CaseAudit < ApplicationRecord
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

    belongs_to :created_by, :class_name => 'User'
    belongs_to :auditable, polymorphic: true

    validates :action, presence: true
    validates :created_by, presence: true
    validates :auditable, presence: true
end
