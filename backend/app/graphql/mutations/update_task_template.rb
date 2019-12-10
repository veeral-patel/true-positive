class Mutations::UpdateTaskTemplate < Mutations::BaseMutation
    description "Update a task template."

    argument :id, ID, required: true do
        description "ID of the task template to update."
    end

    argument :name, String, required: false do
        description "New name."
    end

    argument :description, String, required: false do
        description "New description."
    end

    field :task_template, Types::TaskTemplateType, null: true do
        description "The updated task template."
    end

    def resolve(id:, name: nil, description: nil)
        # find the task template in memory
        template = find_task_template_or_throw_execution_error(template_id: id)

        # update it in memory
        if not name.nil?
            template.name = name
        end

        if not description.nil?
            template.description = description
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