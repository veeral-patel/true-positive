class Mutations::RenamePriority < Mutations::BaseMutation
    description "Changes the name of a priority."

    argument :old_name, String, required: true do
        description "The ID of the priority to rename."
    end

    argument :new_name, String, required: true do
        description "The new priority name."
    end

    field :priority, Types::PriorityType, null: true do
        description "The updated priority."
    end

    def resolve(old_name:, new_name:)
        # find the priority
        priority = find_priority_by_name_or_throw_execution_error(priority_name: old_name)

        # authorize this action
        unless PriorityPolicy.new(context[:current_user], priority).rename_priority?
            raise GraphQL::ExecutionError, "You are not authorized to rename priorities."
        end

        # update the priority in memory
        priority.name = new_name

        # and save the priority
        if priority.save
            {
                "priority": priority
            }
        else
            raise GraphQL::ExecutionError, priority.errors.full_messages.join(" | ")
        end
    end
end