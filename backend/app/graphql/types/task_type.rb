module Types
    class TaskType < Types::BaseObject
        description "Represents a piece of work in a case."

        # never null
        field :id, ID, null: false do
            description "A unique integer identifying this task."
        end

        field :name, String, null: false do
            description "This task's name."
        end

        field :done, Boolean, null: false do
            description "Whether this task has been completed."
        end

        field :position, Int, null: false do
            description "The UI lists tasks in ascending order of their position."
        end

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
            description "When this task was created (in ISO8601 format)."
        end

        field :created_by, Types::UserType, null: false do
            description "The user who created this task."
        end

        field :case, Types::CaseType, null: false do
            description "The case this task belongs to."
        end

        field :comments, [Types::CommentType], null: false do
            description "The comments on this task."
        end

        field :comment_count, Int, null: false do
            description "The number of comments on this task."
        end

        # possibly null
        field :description, String, null: true do
            description "This task's description."
        end

        field :assigned_to, Types::UserType, null: true do
            description "The user this task was assigned to (if any)."
        end
    end
end