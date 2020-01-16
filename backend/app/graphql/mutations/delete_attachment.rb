class Mutations::DeleteAttachment < Mutations::BaseMutation
    description "Removes an attachment from a case, task, indicator, or other object."

    argument :id, ID, required: true do
        description "ID of the attachment to delete."
    end

    field :id, ID, null: true do
        description "ID of the attachment that was just deleted."
    end

    def resolve(id:)
    end
end