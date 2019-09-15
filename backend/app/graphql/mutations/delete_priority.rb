class Mutations::DeletePriority < Mutations::BaseMutation
    description "Deletes a priority. You cannot delete a priority if any cases or tasks have that priority."

    argument :id, ID, required: true

    # ID of the deleted priority 
    field :id, ID, null: false

    def resolve(id:)
        priority = find_priority_or_throw_execution_error(priority_id: id)

        if priority.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, priority.errors.full_messages.join(" | ")
        end
    end
end