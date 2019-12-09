class Mutations::ChangeComment < Mutations::BaseMutation
    description "Update a comment. You must be the author of the comment to edit it."

    argument :id, ID, required: true do
        description "The ID of the comment to delete."
    end

    argument :comment, String, required: true do
        description "The comment's new text."
    end

    field :comment, Types::CommentType, null: true do
        description "The updated comment."
    end

    def resolve(id:, comment:)
        comment_record = find_comment_or_throw_execution_error(comment_id: id)

        # authorize this action
        unless CommentPolicy.new(context[:current_user], comment_record).change_comment?
            raise GraphQL::ExecutionError, "To edit a comment, you must (1) be its author and (2) be able to edit its case."
        end

        # update the comment in memory
        comment_record.comment = comment

        # and save it to the database
        if comment_record.save
            {
                "comment": comment_record
            }
        else
            raise GraphQL::ExecutionError, comment_record.errors.full_messages.join(" | ")
        end
    end
end