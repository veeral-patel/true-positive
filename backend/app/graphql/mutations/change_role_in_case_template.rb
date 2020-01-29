class Mutations::ChangeRoleInCaseTemplate < Mutations::BaseMutation
    description "Change the role of a user or a group in a case template."

    # required ---

    argument :case_template_id, ID, required: true do
        description "ID of the case template to update."
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

    field :case_template, Types::CaseTemplateType, null: true do
        description "The updated case template."
    end

    def resolve(case_template_id:, role:, username: nil, group_id: nil)
        # ensure exactly one of username and group_id is provided
        if not [username, group_id].one? { |id| not id.nil? } 
            raise GraphQL::ExecutionError, "Please provide exactly one of these arguments: username, groupId."
        end

        if not username.nil?
            # if username is provided, then change the role of the corresponding user
            change_role_of_a_user(case_template_id: case_template_id, role: role, username: username)
        elsif not group_id.nil?
            # similarly, if groupId is provided, change the role of the corresponding user
            change_role_of_a_group(case_template_id: case_template_id, role: role, group_id: group_id)
        end
    end

    private
        def change_role_of_a_group(case_template_id:, role:, group_id:)
            # find the case template and the group in question
            case_template = find_case_template_or_throw_execution_error(id: case_template_id)
            group = find_group_or_throw_execution_error(id: group_id)

            # authorize this action
            unless CaseTemplatePolicy.new(context[:current_user], case_template).update_template?
                raise GraphQL::ExecutionError, "You are not authorized to update this template."
            end

            # ensure the case has the group we're updating
            begin
                case_group = case_template.default_groups.find_by!(group: group)
            rescue ActiveRecord::RecordNotFound
                raise GraphQL::ExecutionError, "This case template doesn't have group #{group.name}."
            end

            # update the case group in memory
            case_group.role = role

            # and save the case group to the database
            if case_group.save
                { case_template: case_template }
            else
                raise GraphQL::ExecutionError, case_template.errors.full_messages.join(" | ")
            end
        end

        def change_role_of_a_user(case_template_id:, role:, username:)
            # find the case and the user in question
            case_template = find_case_template_or_throw_execution_error(id: case_template_id)
            user = find_user_or_throw_execution_error(username: username)

            # authorize this action
            unless CaseTemplatePolicy.new(context[:current_user], case_template).update_template?
                raise GraphQL::ExecutionError, "You are not authorized to update this template."
            end

            # find the case member to update
            begin
                member = case_template.default_members.find_by!(user: user)
            rescue ActiveRecord::RecordNotFound
                raise GraphQL::ExecutionError, "#{username} is not a member of the specified case template."
            end

            # update the case member in memory
            member.role = role

            # and save to the database
            if member.save
                { case_template: case_template }
            else
                raise GraphQL::ExecutionError, case_template.errors.full_messages.join(" | ")
            end
        end
end