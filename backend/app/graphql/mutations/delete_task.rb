class Mutations::DeleteTask < Mutations::BaseMutation
    description "Delete a task."

    argument :id, ID, required: true do
        description "The ID of the task to delete."
    end

    field :id, ID, null: false do
        description "The ID of the task that was just deleted."
    end

    def resolve(id:)
        task = find_task_or_throw_execution_error(task_id: id)

        if task.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, task.errors.full_messages.join(" | ")
        end
    end
end