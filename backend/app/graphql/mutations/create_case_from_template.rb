class Mutations::CreateCaseFromTemplate < Mutations::BaseMutation
    description "Creates a new case from a case template."

    argument :template_id, ID, required: true do
        description "ID of the case template to create this case from."
    end

    field :case, Types::CaseType, null: true do
        description "The newly created case."
    end

    def resolve(template_id:)
    end
end