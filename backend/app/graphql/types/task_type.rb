module Types
    class TaskType < Types::BaseObject
        description "Represents a piece of work in a case."

        # required fields
        field :id, ID, null: false do
            description "A unique integer identifying this task."
        end

        field :name, String, null: false do
        end

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
        end

        field :created_by, Types::UserType, null: false do
        end

        field :status, Types::StatusType, null: false do
            description "This task's status."
        end

        field :priority, Types::PriorityType, null: false do
            description "This task's priority."
        end

        field :case, Types::CaseType, null: false do
        end

        field :comments, [Types::CommentType], null: false do
        end

        field :tags, [Types::TagType], null: false do
            description "This task's tags."
        end

        # optional fields
        field :description, String, null: true do
            description "This task's description."
        end

        field :assigned_to, Types::UserType, null: true do
            description "The user this task was assigned to (if any)."
        end
    end
end