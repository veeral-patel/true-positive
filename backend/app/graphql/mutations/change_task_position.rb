class Mutations::ChangeTaskPosition < Mutations::BaseMutation
    description "Updates the position of a task in a case."

    argument :id, ID, required: true do
        description "ID of the task to move."
    end

    argument :position, Int, required: true do
        description "The new position."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task."
    end

    def resolve(id:, position:)
        # find the task
        task = find_task_or_throw_execution_error(task_id: id)

        # authorize this action
        unless TaskPolicy.new(context[:current_user], task).update_task?
            raise GraphQL::ExecutionError, "You are not authorized to move this task."
        end

        # and update its position
        if task.insert_at(position)
            {
                "task": task
            }
        else
            raise GraphQL::ExecutionError, task.errors.full_messages.join(" | ")
        end
    end
end