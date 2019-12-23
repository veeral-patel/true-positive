class Mutations::DeleteTask < Mutations::BaseMutation
    description "Delete a task."

    argument :id, ID, required: true do
        description "The ID of the task to delete."
    end

    field :id, ID, null: true do
        description "The ID of the task that was just deleted."
    end

    def resolve(id:)
        task = find_task_or_throw_execution_error(task_id: id)

        # authorize this action
        unless TaskPolicy.new(context[:current_user], task).delete_task?
            raise GraphQL::ExecutionError, "You are not authorized to delete tasks in this case."
        end

        # delete the task
        if task.destroy_bl(context[:current_user])
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, task.errors.full_messages.join(" | ")
        end
    end
end