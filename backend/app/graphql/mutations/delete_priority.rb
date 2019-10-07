class Mutations::DeletePriority < Mutations::BaseMutation
    description "Deletes a priority. You cannot delete a priority if any cases or tasks have that priority."

    argument :name, String, required: true do
        description "The name of the priority to delete."
    end

    field :name, String, null: true do
        description "The name of the priority that was just deleted."
    end

    def resolve(name:)
        priority = find_priority_by_name_or_throw_execution_error(priority_name: name)

        if priority.destroy
            {
                "name": name
            }
        else
            raise GraphQL::ExecutionError, priority.errors.full_messages.join(" | ")
        end
    end
end