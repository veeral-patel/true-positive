class Mutations::DeleteComment < Mutations::BaseMutation
    argument :id, ID, required: true

    # ID of the deleted comment
    field :id, ID, null: false

    def resolve(id:)
        comment = find_comment_or_throw_execution_error(comment_id: id)

        if comment.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, comment.errors.full_messages.join(" | ")
        end
    end
end