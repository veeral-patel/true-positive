class Mutations::UpdateTask < Mutations::BaseMutation
    description "Update a task."

    argument :task_id, ID, required: true do
        description "The ID of the task to update"    
    end

    argument :name, String, required: false do
        description "New name for this task"
    end

    argument :description, String, required: false do
        description "New description for this task."
    end

    argument :assigned_to, String, required: false do
        description "Username of the user to assign to this task, or 'NA' to assign to no one."
    end

    argument :done, Boolean, required: false do
        description "Whether to mark this task as done or not."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task"
    end

    def resolve(task_id:, name: nil, description: nil, assigned_to: nil, done: nil)
        # find the task
        the_task = find_task_or_throw_execution_error(task_id: task_id)

        # authorize this operation
        unless TaskPolicy.new(context[:current_user], the_task).update_task?
            raise GraphQL::ExecutionError, "You are not authorized to update this task."
        end

        # update the task in memory
        the_task.name = name if not name.nil?
        the_task.description = description if not description.nil?
        the_task.done = done if not done.nil?

        unless assigned_to.nil?
            if assigned_to === "NA"
                the_task.assigned_to = nil
            else
                the_task.assigned_to = find_user_or_throw_execution_error(username: assigned_to)
            end
        end

        # save the task
        if the_task.save
            {
                "task": the_task
            }
        else
            raise GraphQL::ExecutionError, the_task.errors.full_messages.join(" | ")
        end
    end
end