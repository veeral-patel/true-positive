class Mutations::ChangeTaskTemplatePosition < Mutations::BaseMutation
    description "Updates the position of a task template in a case template."

    argument :task_template_id, ID, required: true do
        description "ID of the task template to move."
    end

    argument :task_group_id, ID, required: true do
        description "ID of the group this task template is in."
    end

    argument :position, Int, required: true do
        description "The new position."
    end

    field :task_template, Types::TaskTemplateType, null: true do
        description "The updated task template."
    end

    def resolve(task_template_id:, task_group_id:, position:)
        # find the task template
        task_template = find_task_template_or_throw_execution_error(id: task_template_id)
        task_group = find_task_group_or_throw_execution_error(id: task_group_id)

        # authorize this action
        unless TaskTemplatePolicy.new(context[:current_user], task_template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this template."
        end

        # find the TaskGroupTaskTemplate with the provided TT and TG. and raise an error
        # if no such record exists
        begin
            task_group_task_template = TaskGroupTaskTemplate.find_by!(task_group: task_group, task_template: task_template)
        rescue ActiveRecord::RecordNotFound
            raise GraphQL::ExecutionError, "The task group you specified doesn't have a task template with name #{task_template.name}"
        end

        # update its position
        if task_group_task_template.insert_at(position)
            { task_template: task_template }
        else
            raise GraphQL::ExecutionError, task_template.errors.full_messages.join(" | ")
        end
    end
end