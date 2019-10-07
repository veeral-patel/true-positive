require_relative '../helpers'

class Mutations::CreateTask < Mutations::BaseMutation
    description "Creates a new task in a case."

    # required ----

    argument :name, String, required: true do
        description "The name of the new task."
    end

    argument :status, String, required: true do
        description "The new status's status's name."
    end

    argument :priority, String, required: true do
        description "The new priority's priority's name."
    end

    argument :case_id, ID, required: true do
        description "The ID of the case to add this task to."
    end

    # not required ----

    argument :description, String, required: false do
        description "Optional text describing this task."
    end

    argument :assigned_to, ID, required: false do
        description "The username of the user who this task is assigned to. Optional."
    end

    argument :tags, [String], required: false do
        description "A optional list of tags to add to this task."
    end

    field :task, Types::TaskType, null: true do
        description "The newly created task."
    end

    def resolve(name:, status:, priority:, case_id:, description: nil, assigned_to: nil, tags: nil)
        # find case, status, priority, assigned user for this new task
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        status_record = find_status_by_name_or_throw_execution_error(status_name: status)
        priority_record = find_priority_by_name_or_throw_execution_error(priority_name: priority)
        assigned_user = assigned_to.nil? ? nil : find_user_or_throw_execution_error(username: assigned_to)

        # create new task in memory
        new_task = Task.new(
            name: name,
            status: status_record,
            priority: priority_record,
            case: the_case,
            created_by: context[:current_user],
            description: description,
            assigned_to: assigned_user,
            tag_list: tags
        )

        # save it to the database
        if new_task.save
            { "task": new_task }
        else
            raise GraphQL::ExecutionError, new_task.errors.full_messages.join(" | ") 
        end
    end
end