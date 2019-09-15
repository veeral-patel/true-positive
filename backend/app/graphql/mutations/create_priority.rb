class Mutations::CreatePriority < Mutations::BaseMutation
    description "Add a priority. Any case or task can now be given this priority."

    argument :name, String, required: true do
        description "The name of the priority to create (such as 'Critical')."
    end

    argument :description, String, required: false do
        description "Some optional information describing this priority."
    end

    field :priority, Types::PriorityType, null: false do
        description "The newly created priority."
    end

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
