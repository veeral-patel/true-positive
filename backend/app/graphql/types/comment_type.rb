module Types
    class CommentType < Types::BaseObject
        description "Represents a comment on a case, task, or another object."

        field :id, ID, null: false
        field :comment, String, null: false
        field :created_by, Types::UserType, null: false
    end
end