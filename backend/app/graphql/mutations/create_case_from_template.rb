class Mutations::CreateCaseFromTemplate < Mutations::BaseMutation
    description "Creates a new case from a case template."

    argument :template_id, ID, required: true do
        description "ID of the case template to create this case from."
    end

    field :case, Types::CaseType, null: true do
        description "The newly created case."
    end

    def resolve(template_id:)
        template = find_case_template_or_throw_execution_error(id: template_id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], nil).create_case?
            raise GraphQL::ExecutionError, "You are not authorized to create cases."
        end

        # actually create the case
        new_case = CaseService::CreateCaseFromTemplate.run(template: template, created_by: context[:current_user])

        {
            "case": new_case
        }
    end
end