class Mutations::AddMember < Mutations::BaseMutation
    description "Make a user a member of a case. Only a case's members can access or change it."

    # ID of the case we're adding a member to
    argument :case_id, ID, required: true

    # ID of the user we're adding to the case
    argument :user_id, ID, required: true

    # role we want the user to have
    argument :role, Types::RoleEnum, required: true

    # the updated case
    field :case, Types::CaseType, null: true

    def resolve(case_id:, user_id:, role:)
        # find the case and user in question
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        user = find_user_or_throw_execution_error(user_id: user_id)

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