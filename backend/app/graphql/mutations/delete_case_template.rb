class Mutations::DeleteCaseTemplate < Mutations::BaseMutation
    description "Delete a case template."

    argument :id, ID, required: true do
        description "The ID of the case template to delete."
    end

    field :id, ID, null: true do
        description "The ID of the case template that was just deleted."
    end

    def resolve(id:)
    end
end