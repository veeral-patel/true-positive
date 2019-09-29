class Mutations::RenamePriority < Mutations::BaseMutation
    description "Changes the name of a priority."

    argument :old_name, String, required: true do
        description "The ID of the priority to rename."
    end

    argument :new_name, String, required: true do
        description "The new priority name."
    end

    field :priority, Types::PriorityType, null: false do
        description "The updated priority."
    end

    def resolve(old_name:, new_name:)
        # find and update the priority
        priority = find_priority_by_name_or_throw_execution_error(priority_name: old_name)
        priority.name = new_name

        # and save it
        if priority.save
            {
                "priority": priority
            }
        else
            raise GraphQL::ExecutionError, priority.errors.full_messages.join(" | ")
        end
    end
end