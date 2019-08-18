module Types
    class CaseType < Types::BaseObject
        description "Represents an investigation."

        # required
        field :id, ID, null: false
        field :name, String, null: false
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :created_by, Types::UserType, null: false
        field :status, Types::StatusType, null: false
        field :priority, Types::PriorityType, null: false

        # optional
        field :description, String, null: true
        field :assigned_to, Types::UserType, null: true
        field :tags, [String], null: false
        field :tasks, [Types::TaskType], null: false
    end
end
