class Mutations::ChangeComment < Mutations::BaseMutation
    description "Update a comment that you wrote."

    argument :id, ID, required: true do
        description "The ID of the comment to delete."
    end

    argument :comment, String, required: true do
        description "The updated comment."
    end

    field :comment, Types::CommentType, null: true do
        description "The newly created comment."
    end

    def resolve(id:, comment:)
        comment_record = find_comment_or_throw_execution_error(comment_id: id)

        # authorize this action
        unless CommentPolicy.new(context[:current_user], comment_record).change_comment?
            raise GraphQL::ExecutionError, "You can only update comments that you've created."
        end

        # update the comment in memory
        comment_record.comment = comment

        if comment_record.save
            {
                "comment": comment_record
            }
        else
            raise GraphQL::ExecutionError, comment.errors.full_messages.join(" | ")
        end
    end
end