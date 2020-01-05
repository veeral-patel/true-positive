class Mutations::RemoveUserFromCaseTemplate < Mutations::BaseMutation
    description "Remove an user from a case template."

    argument :username, String, required: true do
        description "Username of the user to remove."
    end

    argument :case_template_id, ID, required: true do
        description "ID of the case template to add this user to."
    end

    field :case_template, Types::CaseTemplateType, null: true do
        description "The updated case template."
    end

    def resolve(username:, case_template_id:)
        # find the user and case template
        user = find_user_or_throw_execution_error(username: username)
        case_template = find_case_template_or_throw_execution_error(id: case_template_id)

        # authorize this action
        unless CaseTemplatePolicy.new(context[:current_user], case_template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this template."
        end
    end
end