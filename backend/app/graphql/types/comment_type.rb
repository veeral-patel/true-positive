module Types
    class CommentType < Types::BaseObject
        description "Represents a comment on a case, task, indicator, or another object."

        field :id, ID, null: false do
            description "An unique integer identifying this comment."
        end

        field :comment, String, null: false do
            description "The comment itself."
        end

        field :created_by, Types::UserType, null: false do
            description "The user who wrote this comment."
        end

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
            description "When this comment was created (in ISO8601)"
        end

        field :formatted_created_at, String, null: false do
            description "When this comment was created (nicely formatted)"
        end
    end
end