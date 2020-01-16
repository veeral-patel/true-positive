class Mutations::DeleteAttachment < Mutations::BaseMutation
    description "Removes an attachment from a case, task, indicator, or other object."

    argument :id, ID, required: true do
        description "ID of the attachment to delete."
    end

    field :id, ID, null: true do
        description "ID of the attachment that was just deleted."
    end

    def resolve(id:)
        # find the attachment to destroy
        attachment = find_attachment_or_throw_execution_error(id: id)

        # authorize this action
        unless AttachmentPolicy.new(context[:current_user], attachment).delete?
            raise GraphQL::ExecutionError, "You are not authorized to delete this attachment."
        end

        # destroy the attachment
        if attachment.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, attachment.errors.full_messages.join(" | ")
        end
    end
end