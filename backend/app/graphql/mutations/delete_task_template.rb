class Mutations::DeleteTaskTemplate < Mutations::BaseMutation
    description "Delete a task template."

    argument :id, ID, required: true do
        description "The ID of the task template to delete."
    end

    field :id, ID, null: true do
        description "The ID of the task template that was just deleted."
    end

    def resolve(id:)
        template = find_task_template_or_throw_execution_error(template_id: id)

        # authorize this action
        unless TaskTemplatePolicy.new(context[:current_user], template).delete_template?
            raise GraphQL::ExecutionError, "You are not authorized to delete this template."
        end

        # delete the template
        if template.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, template.errors.full_messages.join(" | ")
        end
    end
end