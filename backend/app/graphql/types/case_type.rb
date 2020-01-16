module Types
    class CaseType < Types::BaseObject
        description "Represents an investigation."

        # never null
        field :id, ID, null: false do
            description "A unique integer identifying this case."
        end

        field :name, String, null: false do
            description "This case's name."
        end

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
            description "When this case was created (in ISO8601 format)."
        end

        field :created_by, Types::UserType, null: false do
          description "The user who created this case."  
        end

        field :status, Types::StatusType, null: false do
            description "This case's status."
        end

        field :priority, Types::PriorityType, null: false do
            description "This case's priority."
        end

        field :comments, [Types::CommentType], null: false do
            description "The comments on this case. Does not include comments on this case's tasks or indicators."
        end

        field :task_groups, [Types::TaskGroupType], null: false do
            description "This case's task groups."
        end

        field :tasks, [Types::TaskType], null: false do
            description "This case's tasks."
        end

        field :attachments, [Types::AttachmentType], null: false do
            description "The files attached to this case."
        end

        field :tags, [Types::TagType], null: false do
            description "This case's tags."
        end

        field :merged_cases, [Types::CaseType], null: false do
            description "The list of cases that've been merged into this case."
        end

        field :is_merged, Boolean, null: false do
            description "Whether this case has been merged into another case."
        end

        field :case_members, [Types::CaseMemberType], null: false do
            description "This case's members. Only the users who are members of this case can access or change it."
        end

        field :indicators, [Types::IndicatorType], null: false do
            description "This case's indicators."
        end

        # field :audits, [Types::AuditType], null: false do
        #     description "The list of audit entries related to this case."
        # end

        field :completed_task_count, Int, null: false do
            description "The number of completed tasks in this case."
        end

        field :total_task_count, Int, null: false do
            description "The total number of tasks in this case."
        end

        field :task_group_count, Int, null: false do
            description "The number of task groups in this case."
        end

        # possibly null
        field :description, String, null: true do
            description "This case's description."
        end

        field :assigned_to, Types::UserType, null: true do
            description "The user this case was assigned to (if any)."
        end

        field :merged_into, Types::CaseType, null: true do
            description "The case that this case has been merged into (if any)."
        end

        field :reason_for_merging, String, null: true do
            description "The reason why this case was merged into its parent case."
        end
    end
end
