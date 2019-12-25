class Mutations::CreateGroup < Mutations::BaseMutation
    description "Creates a new user group."

    # required ---
    argument :name, String, required: true do
        description "The new group's name."
    end

    # output ---
    field :group, Types::GroupType, null: false do
        description "The newly created group."
    end

    def resolve(name:)
        # create a group in memory
        new_group = Group.new(name: name)

        # authorize this action
        unless GroupPolicy.new(context[:current_user], new_group).create_group?
            raise GraphQL::ExecutionError, "You are not authorized to create groups."
        end

        # save the group
        if new_group.save
            { "group": new_group }
        else
            raise GraphQL::ExecutionError, new_group.errors.full_messages.join(" | ") 
        end
    end
end