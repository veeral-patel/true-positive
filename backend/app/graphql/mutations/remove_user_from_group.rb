class Mutations::RemoveUserFromGroup < Mutations::BaseMutation
    description "Remove a user from a group."

    argument :username, String, required: true do
        description "Username of the user to remove."
    end

    argument :group_id, ID, required: true do
        description "ID of the group to remove the user from."
    end

    field :group, Types::GroupType, null: true do
        description "The updated group."
    end

    def resolve(username:, group_id:)
        # find the user and group
        user = find_user_or_throw_execution_error(username: username)
        group = find_group_or_throw_execution_error(id: group_id)

        # raise an exception if the user is not in the group
        if not group.users.include? user
            raise GraphQL::ExecutionError, "#{user.username} is not a member of this group."
        end

        # authorize this action
        unless GroupPolicy.new(context[:current_user], group).update_group?
            raise GraphQL::ExecutionError, "You are not authorized to update this group."
        end

        # remove the user
        if group.users.destroy(user)
            { "group": group }
        else
            raise GraphQL::ExecutionError, group.errors.full_messages.join(" | ") 
        end
    end
end