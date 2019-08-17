class Mutations::CreatePriority < Mutations::BaseMutation
    argument :name, String, required: true
    argument :description, String, required: false

    field :priority, Types::PriorityType, null: false

    def resolve(name:, description: nil)
        priority = Priority.new(name: name, description: description)

        if priority.save
            {
                "priority": priority
            }
        else
            raise GraphQL::ExecutionError, priority.errors.full_messages.join(" | ")
        end
    end
end
