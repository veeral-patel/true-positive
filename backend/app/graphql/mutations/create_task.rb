require_relative '../helpers'

class Mutations::CreateTask < Mutations::BaseMutation
    description "Adds a new task to a case."

    # required ----

    argument :name, String, required: true do
        description "The name of the new task."
    end

    argument :case_id, ID, required: true do
        description "The ID of the case to add this task to."
    end

    # not required ----

    argument :task_group_id, ID, required: false do
        description "The ID of the task group to add this task to. If not specified, then a new task group called 'General' is created and the task is added to it."
    end

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

    def resolve(name:, case_id:, task_group_id: nil, done: false, description: nil, assigned_to: nil)
        # find the case, assigned user for this new task
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        assigned_user = assigned_to.nil? || assigned_to == "N/A" ? nil : find_user_or_throw_execution_error(username: assigned_to)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).create_task?
            raise GraphQL::ExecutionError, "You are not authorized to add tasks to this case."
        end

        task_group = nil
        if task_group_id.nil?
            # if no task group was specified, create a task group
            task_group = context[:current_user].created_task_groups.create(name: "General", caseable: the_case)
        else
            # add to the appropriate task group if specified
            task_group = find_task_group_or_throw_execution_error(id: task_group_id)
            if not the_case.task_groups.include? task_group
                raise GraphQL::ExecutionError, "The case you specified does not have an task group with ID #{task_group_id}"
            end
        end

        # create new task in memory
        new_task = context[:current_user].created_tasks.new(
            name: name,
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