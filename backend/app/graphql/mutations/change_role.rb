class Mutations::ChangeRole
    description "Change a case member's role."

    argument :case_id, ID, required: true do
        description "The ID of the case in which we're changing a member's role."
    end

    argument :username, String, required: true do
        description "The username of the user whose role we're changing."
    end

    argument :role, Types::CaseRoleEnum, required: true do
        description "The case member's new role."
    end

    def resolve(case_id:, username:, role:)
        # find the case and the user in question
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        user = find_user_or_throw_execution_error(username: username)

        # TODO: write the rest of the mutation
    end
end