class Mutations::AddUserToCaseTemplate < Mutations::BaseMutation
    description "Add an user to a case template."

    argument :username, String, required: true do
        description "Username of the user to add."
    end

    argument :role, Types::CaseRoleEnum, required: true do
        description "The level of permission the user has in cases created from this template."
    end

    argument :case_template_id, ID, required: true do
        description "ID of the case template to add this user to."
    end

    field :case_template, Types::CaseTemplateType, null: true do
        description "The updated case template."
    end

    def resolve(username:, role:, case_template_id:)
        # find the user and case template
        user = find_user_or_throw_execution_error(username: username)
        case_template = find_case_template_or_throw_execution_error(id: case_template_id)

        # authorize this action
        unless CaseTemplatePolicy.new(context[:current_user], case_template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this template."
        end

        # ensure the CT doesn't already have the user
        if case_template.default_members.map { |member| member.user }.include? user
            raise GraphQL::ExecutionError, "#{user.username} is already in this group."
        end

        # add the user to the CT in memory
        if case_template.default_members.create(user: user, role: role)
            { case_template: case_template }
        else
            raise GraphQL::ExecutionError, case_template.errors.full_messages.join(" | ") 
        end
    end
end