class Mutations::AddMember < Mutations::BaseMutation
    description "Make a user a member of a case. Only a case's members can access or change it."

    argument :case_id, ID, required: true do
        description "The ID of the case we're adding a member to"
    end

    argument :username, String, required: true do
        description "The username of the user we're adding to the case."
    end

    argument :role, Types::CaseRoleEnum, required: true do
        description "The level of permissions we want the user to have in the case."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(case_id:, username:, role:)
        # find the case and user in question
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        user = find_user_or_throw_execution_error(username: username)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).add_member?
            raise GraphQL::ExecutionError, "You are not authorized to add users to this case."
        end

        # try to add the user to the case
        if the_case.add_member(user, role)
            {
                "case": the_case
            }
        else
            raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
        end
    end
end