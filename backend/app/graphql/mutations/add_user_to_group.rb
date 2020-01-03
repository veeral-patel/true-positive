class Mutations::AddUserToGroup < Mutations::BaseMutation
    description "Add a user to a group."

    argument :username, ID, required: true do
        description "Username of the user to add."
    end

    argument :group_id, ID, required: true do
        description "ID of the group to add the user to."
    end

    field :group, Types::GroupType, null: true do
        description "The updated group."
    end

    def resolve(username:, group_id:)
        # find the user and group
        user = find_user_or_throw_execution_error(username: username)
        group = find_group_or_throw_execution_error(id: group_id)

        # add the user to the group in memory
        group.users << user

        # authorize this action
        unless GroupPolicy.new(context[:current_user], group).update_group?
            raise GraphQL::ExecutionError, "You are not authorized to update this group."
        end

        # save the group
        if group.save
            { "group": group }
        else
            raise GraphQL::ExecutionError, group.errors.full_messages.join(" | ") 
        end
    end
end