class Mutations::DeleteGroup < Mutations::BaseMutation
    description "Deletes an user group."

    argument :id, ID, required: true do
        description "The ID of the group to delete."
    end

    field :id, ID, null: true do
        description "The ID of the group that was just deleted."
    end

    def resolve(id:)
        group = find_group_or_throw_execution_error(id: id)

        # authorize this action
        unless GroupPolicy.new(context[:current_user], group).delete_group?
            raise GraphQL::ExecutionError, "You are not authorized to delete groups."
        end

        # delete the group
        if group.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, group.errors.full_messages.join(" | ")
        end
    end
end