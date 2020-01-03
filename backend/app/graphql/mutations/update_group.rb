class Mutations::UpdateGroup < Mutations::BaseMutation
    description "Update a group."

    argument :id, ID, required: true do
        description "The ID of the group to update."
    end

    argument :name, String, required: false do
        description "New name for this group."
    end

    field :group, Types::GroupType, null: true do
        description "The updated group."
    end

    def resolve(id:, name: nil)
        group = find_group_or_throw_execution_error(id: id)

        # authorize this operation
        unless GroupPolicy.new(context[:current_user], group).update_group?
            raise GraphQL::ExecutionError, "You are not authorized to update this group."
        end

        # update the group in memory
        group.name = name if not name.nil?

        # save the updated group
        if group.save
            {
                "group": group
            }
        else
            raise GraphQL::ExecutionError, group.errors.full_messages.join(" | ")
        end
    end
end