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

    # TODO: remove the URL field
    field :url, String, null: true do
        description "A URL to access the newly uploaded file."
    end

    def resolve(blob:, filename:, case_id:)
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        decoded = Base64.decode64(blob)

        at = the_case.attachments.create(file: {
            io: StringIO.new(decoded),
            filename: filename
        }, created_by: context[:current_user])

        {
            "url": at.url
        }
    end
end