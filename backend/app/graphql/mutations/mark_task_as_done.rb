class Mutations::MarkTaskAsDone < Mutations::BaseMutation
    description "Marks a task as done (or not done)."

    argument :id, ID, required: true do
        description "The ID of the task to update."
    end

    argument :done, Boolean, required: true do
        description "True marks this task as done; false as not done."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task."
    end

    def resolve(id:, done:)
        # find and update the task
        task = find_task_or_throw_execution_error(task_id: id)
        task.done = done

        # authorize this action
        unless TaskPolicy.new(context[:current_user], task).change_done?
            raise GraphQL::ExecutionError, "You are not authorized to mark this task as done (or not done)."
        end

        # and save it
        if task.save
            { "task": task }
        else
            raise GraphQL::ExecutionError, task.errors.full_messages.join(" | ")
        end
    end
end