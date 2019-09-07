class Mutations::DeleteTask < Mutations::BaseMutation
    argument :id, ID, required: true

    # ID of the deleted task
    field :id, ID, null: false

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