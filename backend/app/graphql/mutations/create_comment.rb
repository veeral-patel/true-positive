class Mutations::CreateComment < Mutations::BaseMutation
    description "Add a comment to a case, task, or indicator."

    argument :type, Types::HasCommentsEnum, required: true do
        description "The type of object you're commenting on."
    end

    argument :object_id, ID, required: true do
        description "The ID of the case, task, or indicator."
    end

    argument :comment, String, required: true do
        description "The text of the comment."
    end

    field :comment, Types::CommentType, null: false do
        description "The newly created comment."
    end

    def resolve(type:, object_id:, comment:)
        if type === "CASE" # commenting on a case
            commentable = find_case_or_throw_execution_error(case_id: object_id)
        end

        # TO DO: support commenting on a task and on an indicator

        new_comment = Comment.new(
            commentable: commentable,
            comment: comment,
        )

        if new_comment.save
            { "comment": new_comment }
        else
            raise GraphQL::ExecutionError, new_comment.errors.full_messages.join(" | ")
        end
    end
end