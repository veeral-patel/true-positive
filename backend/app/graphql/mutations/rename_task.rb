class Mutations::RenameTask < Mutations::BaseMutation
    description "Changes the name of a task."

    argument :id, ID, required: true do
        description "The ID of the task to rename."
    end

    argument :name, String, required: true do
        description "The new task name."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task."
    end

    def resolve(id:, name:)
        # find and update the task
        task = find_task_or_throw_execution_error(task_id: id)
        task.name = name

        # authorize this action
        unless TaskPolicy.new(context[:current_user], task).rename_task?
            raise GraphQL::ExecutionError, "You are not authorized to rename tasks in this case."
        end

        # and save it
        if task.save
            {
                "task": task
            }
        else
            raise GraphQL::ExecutionError, task.errors.full_messages.join(" | ")
        end
    end
end