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

    field :comment, Types::CommentType, null: true do
        description "The newly created comment."
    end

    def resolve(type:, object_id:, comment:)
        # find the object we're commenting upon
        if type == "CASE"
            commentable = find_case_or_throw_execution_error(case_id: object_id)
        elsif type == "TASK"
            commentable = find_task_or_throw_execution_error(task_id: object_id)
        elsif type == "INDICATOR"
            commentable = find_indicator_or_throw_execution_error(indicator_id: object_id)
        end

        # create the comment in memory
        new_comment = context[:current_user].comments.new(
            commentable: commentable,
            comment: comment,
        )

        # authorize this action
        unless CommentPolicy.new(context[:current_user], new_comment).create_comment?
            raise GraphQL::ExecutionError, "You are not authorized to comment."
        end

        # actually save it
        if new_comment.save
            { "comment": new_comment }
        else
            raise GraphQL::ExecutionError, new_comment.errors.full_messages.join(" | ")
        end
    end
end