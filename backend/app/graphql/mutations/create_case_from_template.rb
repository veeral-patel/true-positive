class Mutations::CreateCaseFromTemplate < Mutations::BaseMutation
    description "Creates a new case from a case template."

    argument :template_id, ID, required: true do
        description "ID of the case template to create this case from."
    end

    field :case, Types::CaseType, null: true do
        description "The newly created case."
    end

    def resolve(template_id:)
        template = find_case_template_or_throw_execution_error(id: id)

        # create a case in memory from the template
        new_case = context[:current_user].cases.new(
            name: template.name,
            status: template.status,
            priority: template.priority,
            description: template.priority,
            assigned_to: template.assigned_to,
            tag_list: template.tag_list
        )

        # authorize this action
        unless CasePolicy.new(context[:current_user], new_case).create_case?
            raise GraphQL::ExecutionError, "You are not authorized to create cases."
        end

        # save to the database
        if new_case.save
            {
                "case": new_case
            }
        else
            raise GraphQL::ExecutionError, new_case.errors.full_messages.join(" | ") 
        end
    end
end