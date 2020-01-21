class Mutations::CreateAttachment < Mutations::BaseMutation
    # TODO: add a description here

    argument :blob, String, required: true do
        description "The file, base64-encoded."
    end

    argument :filename, String, required: true do
        description "The file's filename."
    end

    argument :case_id, ID, required: true do
        description "ID of the case to add this attachment to."
    end

    field :attachment, Types::AttachmentType, null: true do
        description "The newly created attachment."
    end

    def resolve(blob:, filename:, case_id:)
        # find the case to add this attachment to
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # TODO: authorize this action

        # create a new attachment in memory
        new_attachment = the_case.attachments.new(
            file: { io: StringIO.new(Base64.decode64(blob)), filename: filename },
            created_by: context[:current_user]
        )

        # and save it to the database
        if new_attachment.save
            {
                "attachment": new_attachment
            }
        else
            raise GraphQL::ExecutionError, attachment.errors.full_messages.join(" | ")
        end
    end
end