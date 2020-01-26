class Mutations::ChangeTaskTemplatePosition < Mutations::BaseMutation
    description "Updates the position of a task template in a case template."

    argument :id, ID, required: true do
        description "ID of the task template to move."
    end

    argument :position, Int, required: true do
        description "The new position."
    end

    field :task_template, Types::TaskTemplateType, null: true do
        description "The updated task template."
    end

    def resolve(id:, position:)
        # find the task template
        task_template = find_task_template_or_throw_execution_error(id: id)

        # authorize this action
        unless TaskTemplatePolicy.new(context[:current_user], task_template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this template."
        end

        # and update its position
        if task_template.insert_at(position)
            { task_template: task_template }
        else
            raise GraphQL::ExecutionError, task_template.errors.full_messages.join(" | ")
        end
    end
end