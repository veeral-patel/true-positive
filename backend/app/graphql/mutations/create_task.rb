require_relative '../helpers'

class Mutations::CreateTask < Mutations::BaseMutation
    description "Creates a new task in a case."

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

    argument :assigned_to, ID, required: false do
        description "The username of the user who this task is assigned to. Optional."
    end

    argument :tags, [String], required: false do
        description "A optional list of tags to add to this task."
    end

    field :task, Types::TaskType, null: true do
        description "The newly created task."
    end

    def resolve(name:, case_id:, done: false, description: nil, assigned_to: nil, tags: nil)
        # find case, assigned user for this new task
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        assigned_user = assigned_to.nil? ? nil : find_user_or_throw_execution_error(username: assigned_to)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).create_task?
            raise GraphQL::ExecutionError, "You are not authorized to create tasks in this case."
        end

        # create new task in memory
        new_task = Task.new(
            name: name,
            case: the_case,
            created_by: context[:current_user],
            description: description,
            assigned_to: assigned_user,
            tag_list: tags,
            done: done
        )

        # save it to the database
        if new_task.save
            { "task": new_task }
        else
            raise GraphQL::ExecutionError, new_task.errors.full_messages.join(" | ") 
        end
    end
end