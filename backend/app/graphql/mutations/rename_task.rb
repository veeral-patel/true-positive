class Mutations::RenameTask < Mutations::BaseMutation
    description "Changes the name of a task."

    argument :id, ID, required: true do
        description "The name of the task to rename."
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