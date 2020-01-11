require_relative '../helpers'

class Mutations::CreateTask < Mutations::BaseMutation
    description "Adds a new task to a case."

    # required ----

    argument :name, String, required: true do
        description "The name of the new task."
    end

    argument :task_group_id, ID, required: true do
        description "The ID of the task group to add this task to."
    end

    # not required ----

    argument :done, Boolean, required: false do
        description "Whether you want to mark this task as done once it's created."
    end

    argument :description, String, required: false do
        description "This task's description."
    end

    argument :assigned_to, String, required: false do
        description "The username of the user who this task is assigned to, or 'N/A'"
    end

    field :task, Types::TaskType, null: true do
        description "The newly created task."
    end

    def resolve(name:, task_group_id:, done: false, description: nil, assigned_to: nil)
        # find task group, assigned user for this new task
        task_group = find_task_group_or_throw_execution_error(id: task_group_id)
        assigned_user = assigned_to.nil? || assigned_to == "N/A" ? nil : find_user_or_throw_execution_error(username: assigned_to)

        # authorize this action
        unless CasePolicy.new(context[:current_user], task_group.case).create_task?
            raise GraphQL::ExecutionError, "You are not authorized to add tasks to this case."
        end

        # create new task in memory
        new_task = Task.new(
            name: name,
            created_by: context[:current_user],
            description: description,
            assigned_to: assigned_user,
            done: done,
            task_group: task_group
        )

        # save it to the database
        if new_task.save
            { "task": new_task }
        else
            raise GraphQL::ExecutionError, new_task.errors.full_messages.join(" | ") 
        end
    end
end