class Mutations::CreatePriority < Mutations::BaseMutation
    description "Add a priority. Any case or task can now be given this priority."

    argument :name, String, required: true do
        description "The name of the priority to create (such as 'Critical')."
    end

    argument :description, String, required: false do
        description "Some optional information describing this priority."
    end

    field :priority, Types::PriorityType, null: true do
        description "The newly created priority."
    end

    def resolve(name:, description: nil)
        # create the priority in memory
        priority = Priority.new(name: name, description: description)

        # authorize this action
        unless PriorityPolicy.new(context[:current_user], priority).create_priority?
            raise GraphQL::ExecutionError, "You are not authorized to create priorities."
        end

        # and save the new priority
        if priority.save
            {
                "priority": priority
            }
        else
            raise GraphQL::ExecutionError, priority.errors.full_messages.join(" | ")
        end
    end
end
