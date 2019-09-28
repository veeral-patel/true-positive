class Mutations::CreateComment < Mutations::BaseMutation
    description "Add a comment to a case, task, or indicator."

    # TO DO: create HasCommentsEnum
    argument :type, Types::HasCommentsEnum, required: true do
        description: "The type of object you're commenting on."
    end

    argument :object_id, ID, required: true
        description "The ID of the case, task, or indicator."
    do

    argument :comment, String, required: true do
        description "The text of the comment."
    end

    def resolve(type:, object_id:, comment:) do

        # commenting on a case
        if type === "CASE"
            commentable = find_case_or_throw_execution_error(case_id: object_id)
        # TO DO: support commenting on a task and on an indicator
        end

        new_comment = Comment.new(
            commentable: commenting_on
            comment: comment,
        )

        if new_comment.save
            { "comment": new_comment }
        else
            raise GraphQL::ExecutionError, new_comment.errors.full_messages.join(" | ")
        end
    end
end