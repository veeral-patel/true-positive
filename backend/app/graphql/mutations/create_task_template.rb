class Mutations::CreateTaskTemplate < Mutations::BaseMutation
    description "Creates a new task template, which you can initialize tasks from later."

    # required ---

    argument :name, String, required: true do
        description "Default name for tasks created with this template."
    end

    # not required ---

    argument :description, String, required: false do
        description "Default description for tasks created with this template."
    end

    argument :assigned_to, String, required: false do
        description "Username of the user to assign to tasks created from this template."
    end

    field :task_template, Types::TaskTemplateType, null: true do
        description "The newly created task template."
    end

    def resolve(name:, description: nil, assigned_to: nil)
        assigned_user = assigned_to.nil? ? nil : find_user_or_throw_execution_error(username: assigned_to)

        # create the task template in memory
        new_template = TaskTemplate.new(
            name: name,
            description: description,
            created_by: context[:current_user],
            assigned_to: assigned_user
        )

        # authorize this action
        unless TaskTemplatePolicy.new(context[:current_user], new_template).create_template?
            raise GraphQL::ExecutionError, "You are not authorized to create task templates."
        end

        # and persist to the database
        if new_template.save
            {
                "task_template": new_template
            }
        else
            raise GraphQL::ExecutionError, new_template.errors.full_messages.join(" | ") 
        end
    end
end