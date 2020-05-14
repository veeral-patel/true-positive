class Mutations::DeleteComment < Mutations::BaseMutation
    description "Deletes a comment on a case, task, or indicator."

    argument :id, ID, required: true do
        description "ID of the comment to delete."
    end

    field :id, ID, null: true do
        description "ID of the comment that was deleted."
    end

    def resolve(id:)
        # find the comment to destroy
        comment = find_comment_or_throw_execution_error(comment_id: id)

        # authorize this action
        unless CommentPolicy.new(context[:current_user], comment).delete_comment?
            raise GraphQL::ExecutionError, "You can only delete comments that you've created."
        end

        # destroy the comment
        if comment.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, comment.errors.full_messages.join(" | ")
        end
    end
end