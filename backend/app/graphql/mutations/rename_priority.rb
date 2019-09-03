class Mutations::RenamePriority < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: true # new priority name

    # updated priority
    field :priority, Types::PriorityType, null: false

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