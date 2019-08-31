module Types
    class TaskType < Types::BaseObject
        description "Represents a piece of work in a case."

        # required fields
        field :id, ID, null: false
        field :name, String, null: false
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :created_by, Types::UserType, null: false
        field :status, Types::StatusType, null: false
        field :priority, Types::PriorityType, null: false
        field :case, Types::CaseType, null: false
        field :comments, [Types::CommentType], null: false
        field :indicators, [Types::IndicatorType], null: false

        # optional fields
        field :description, String, null: true
        field :assigned_to, Types::UserType, null: true
        field :tags, [String], null: false
    end
end