class Mutations::UpdateTaskTemplate < Mutations::BaseMutation
    description "Update a task template."

    # required ---

    argument :id, ID, required: true do
        description "ID of the task template to update."
    end

    # not required ---

    argument :name, String, required: false do
        description "New name."
    end

    argument :description, String, required: false do
        description "New description."
    end

    argument :assigned_to, String, required: false do
        description "Username of the user to assign to tasks created from this template. 'N/A' if not applicable."
    end

    # output ---

    field :task_template, Types::TaskTemplateType, null: true do
        description "The updated task template."
    end

    def resolve(id:, name: nil, description: nil, assigned_to: nil)
        # find the task template in memory
        template = find_task_template_or_throw_execution_error(template_id: id)

        # update it in memory
        template.name = name if not name.nil?
        template.description = description if not name.nil?

        unless assigned_to.nil?
            if assigned_to === "N/A"
                template.assigned_to = nil
            else
                template.assigned_to = find_user_or_throw_execution_error(username: assigned_to)
            end
        end

        # authorize this action
        unless TaskTemplatePolicy.new(context[:current_user], template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this template."
        end 

        # save the updated template
        if template.save
            {
                "task_template": template
            }
        else
            raise GraphQL::ExecutionError, template.errors.full_messages.join(" | ")
        end
    end
end