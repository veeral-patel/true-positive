class Mutations::UpdateTask < Mutations::BaseMutation
    description "Update a task."

    argument :task_id, ID, required: true do
        description "The ID of the task to update"    
    end

    argument :name, String, required: false do
        description "New name for this task"
    end

    field :task, Types::CaseType, null: true do
        description "The updated task"
    end

    def resolve(task_id:, name: nil)
        # find the task
        the_task = find_task_or_throw_execution_error(task_id: task_id)

        # TODO: authorize this operation

        # update the task in memory
        the_task.name = name if not name.nil?

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