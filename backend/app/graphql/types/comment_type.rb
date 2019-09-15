module Types
    class CommentType < Types::BaseObject
        description "Represents a comment on a case, task, indicator, or another object."

        field :id, ID, null: false
        field :comment, String, null: false
        field :created_by, Types::UserType, null: false
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :formatted_created_at, String, null: false
    end
end