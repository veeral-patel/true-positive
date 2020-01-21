class Mutations::CreateAttachment < Mutations::BaseMutation
    # TODO: add a description here

    argument :blob, String, required: true do
        description "The file, base64-encoded."
    end

    argument :filename, String, required: true do
        description "The file's filename."
    end

    # TODO: remove the URL field
    field :url, String, null: true do
        description "A URL to access the newly uploaded file."
    end

    def resolve(blob:, filename:)
        decoded = Base64.decode64(blob)

        Case.last.attachments.create(file: {
            io: StringIO.new(decoded),
            filename: filename
        })

        {
            "url": Attachment.last.url
        }
    end
end