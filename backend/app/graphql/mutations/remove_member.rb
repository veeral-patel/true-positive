class Mutations::RemoveMember < Mutations::BaseMutation
    description "Remove an user from a case. The removed user won't be able to view or change the case anymore."

    argument :case_id, ID, required: true do
        description "The ID of the case we're removing the member from."
    end

    argument :username, String, required: true do
        description "The username of the user we're removing from the case."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(case_id:, username:)
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        user = find_user_or_throw_execution_error(username: username)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).remove_member?
            raise GraphQL::ExecutionError, "You are not authorized to remove users from this case."
        end

        if the_case.remove_member(user, context[:current_user])
            { "case": the_case }
        else
            raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
        end
    end
end