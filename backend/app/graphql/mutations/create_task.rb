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

    argument :done, Boolean, required: false do
        description "Whether you want to mark this task as done once it's created."
    end

    argument :description, String, required: false do
        description "Optional text describing this task."
    end

    argument :assigned_to, String, required: false do
        description "The username of the user who this task is assigned to. Optional."
    end

    field :task, Types::TaskType, null: true do
        description "The newly created task."
    end

    def resolve(name:, case_id:, done: false, description: nil, assigned_to: nil)
        # find case, assigned user for this new task
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        assigned_user = assigned_to.nil? ? nil : find_user_or_throw_execution_error(username: assigned_to)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).create_task?
            raise GraphQL::ExecutionError, "You are not authorized to add tasks to this case."
        end

        # if the case has a task group already, add our new task to the first task group.
        # if it has no task groups, create a task group called "General" and add our new task to it
        if the_case.task_groups.size == 0
            task_group = the_case.task_groups.create(name: "General", created_by: context[:current_user])
        else
            task_group = the_case.task_groups.first
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