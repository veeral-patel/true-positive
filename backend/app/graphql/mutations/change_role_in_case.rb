class Mutations::ChangeRoleInCase  < Mutations::BaseMutation
    description "Change the role of a user or a group in a case."

    # required ---

    argument :case_id, ID, required: true do
        description "ID of the case we're updating"
    end

    argument :role, Types::CaseRoleEnum, required: true do
        description "The new role for the user or group."
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
        # ensure exactly one of username and group_id is provided
        if not [username, group_id].one? { |id| not id.nil? } 
            raise GraphQL::ExecutionError, "Please provide exactly one of these arguments: username, groupId."
        end

        if not username.nil?
            # if username is provided, then change the role of the corresponding user
            change_role_of_a_user(case_id: case_id, role: role, username: username)
        elsif not group_id.nil?
            # similarly, if groupId is provided, change the role of the corresponding user
            change_role_of_a_group(case_id: case_id, role: role, group_id: group_id)
        end
    end

    private
        def change_role_of_a_group(case_id:, role:, group_id:)
            # find the case and the group in question
            the_case = find_case_or_throw_execution_error(case_id: case_id)
            group = find_group_or_throw_execution_error(id: group_id)

            # authorize this action
            unless CasePolicy.new(context[:current_user], the_case).update_case?
                raise GraphQL::ExecutionError, "You are not authorized to update this case."
            end

            # ensure the case has the group we're updating
            begin
                case_group = the_case.case_groups.find_by!(group: group)
            rescue ActiveRecord::RecordNotFound
                raise GraphQL::ExecutionError, "This case doesn't have group #{group.name}."
            end

            # update the case group in memory
            case_group.role = role

            # and save the case group to the database
            if case_group.save
                { case: the_case }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        end

        def change_role_of_a_user(case_id:, role:, username:)
            # find the case and the user in question
            the_case = find_case_or_throw_execution_error(case_id: case_id)
            user = find_user_or_throw_execution_error(username: username)

            # authorize this action
            unless CasePolicy.new(context[:current_user], the_case).update_case?
                raise GraphQL::ExecutionError, "You are not authorized to update this case."
            end

            # find the case member to update
            begin
                member = the_case.case_members.find_by!(user: user)
            rescue ActiveRecord::RecordNotFound
                raise GraphQL::ExecutionError, "#{username} is not a member of the specified case."
            end

            # if this is the last CAN_EDIT member in the case, you cannot make him CAN_VIEW
            number_of_editors = the_case.case_members.where(role: "CAN_EDIT").count
            if number_of_editors == 1 && member.role == "CAN_EDIT"  && role == "CAN_VIEW"
                raise GraphQL::ExecutionError, "Each case must have at least one user with edit access."
            end

            # update the case member in memory
            member.role = role

            # and save to the database
            if member.save
                { case: the_case }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        end
end