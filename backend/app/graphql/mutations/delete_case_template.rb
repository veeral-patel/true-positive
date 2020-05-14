class Mutations::DeleteCaseTemplate < Mutations::BaseMutation
    description "Delete a case template."

    argument :id, ID, required: true do
        description "The ID of the case template to delete."
    end

    field :id, ID, null: true do
        description "The ID of the case template that was just deleted."
    end

    def resolve(id:)
        template = find_case_template_or_throw_execution_error(id: id)

        # show an error if the case template to delete has cc email addresses that use it to create cases
        if template.create_case_email_addresses.count > 0
            first_cc_email_address = template.create_case_email_addresses.first
            raise GraphQL::ExecutionError, "Inbound address #{first_cc_email_address.email} uses this template to create cases. Please delete it before deleting this template."
        end

        # authorize this action
        unless CaseTemplatePolicy.new(context[:current_user], template).delete_template?
            raise GraphQL::ExecutionError, "You are not authorized to delete this template."
        end

        # delete the template
        if template.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, template.errors.full_messages.join(" | ")
        end
    end
end