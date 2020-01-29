class Mutations::ChangeRoleInCase  < Mutations::BaseMutation
    description "Change the role of a user or a group in a case."

    # required ---

    argument :case_id, ID, required: true do
        description "ID of the case we're updating"
    end

    argument :role, Types::CaseRoleEnum, required: true do
        description "The case member's new role."
    end

    # not required ---

    # one of the two arguments below is required
    argument :username, String, required: false do
        description "The username of the user whose role we're changing."
    end

    argument :group_id, ID, required: false do
        description "ID of the group whose role we're changing."
    end

    # output ---

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(case_id:, role:, username: nil, group_id: nil)
        # find the case and the user in question
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        user = find_user_or_throw_execution_error(username: username)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).change_role?
            raise GraphQL::ExecutionError, "You are not authorized to change a case member's role."
        end

        begin
            # find the case member to update
            member = the_case.case_members.find_by!(user: user)

            # if this is the last CAN_EDIT member in the case, you cannot make him CAN_VIEW
            members_who_can_edit = the_case.case_members.where(role: "CAN_EDIT")
            if members_who_can_edit.count == 1  && member.role == "CAN_EDIT"  && role == "CAN_VIEW"
                raise GraphQL::ExecutionError, "You can't make a case's last 'Can Edit' member 'Can View'."
            end

            # update the case member in memory
            member.role = role

            # and save to the database
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