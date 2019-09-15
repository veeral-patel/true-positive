class Mutations::RenamePriority < Mutations::BaseMutation
    description "Changes the name of a priority."

    argument :id, ID, required: true do
        description "The ID of the priority to rename."
    end

    argument :name, String, required: true do
        description "The new priority name."
    end

    field :priority, Types::PriorityType, null: false do
        description "The updated priority."
    end

    def resolve(id:, name:)
        # find and update the priority
        priority = find_priority_or_throw_execution_error(priority_id: id)
        priority.name = name

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