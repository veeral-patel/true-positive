class Mutations::ChangeRole  < Mutations::BaseMutation
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

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(case_id:, username:, role:)
        # find the case and the user in question
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        user = find_user_or_throw_execution_error(username: username)

        begin
            member = the_case.case_members.find_by!(user: user)
            member.role = role
            if member.save
                {
                    "case": the_case
                }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        rescue ActiveRecord::RecordNotFound
            raise GraphQL::ExecutionError, "#{username} is not a member of the specified case."
        end
    end
end