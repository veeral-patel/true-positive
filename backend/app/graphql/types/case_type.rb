module Types
    class CaseType < Types::BaseObject
        description "Represents an investigation."

        # never null
        field :id, ID, null: false
        field :name, String, null: false
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :formatted_created_at, String, null: false
        field :created_by, Types::UserType, null: false
        field :status, Types::StatusType, null: false
        field :priority, Types::PriorityType, null: false
        field :comments, [Types::CommentType], null: false
        field :tasks, [Types::TaskType], null: false
        field :tags, [String], null: false
        field :merged_cases, [Types::CaseType], null: false
        field :is_merged, Boolean, null: false

        # possibly null
        field :description, String, null: true
        field :assigned_to, Types::UserType, null: true
        field :merged_at, GraphQL::Types::ISO8601DateTime, null: true
        field :merged_into, Types::CaseType, null: true
    end
end
