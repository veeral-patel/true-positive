class Mutations::RemoveTaskTemplateFromTaskGroup < Mutations::BaseMutation
    description "Removes a task template from a task group (in a case template)."

    # required ---

    argument :task_template_id, ID, required: true do
        description "ID of the task template to remove."
    end

    argument :task_group_id, ID, required: true do
        description "ID of the task group to remove this task template from."
    end

    field :task_group, Types::TaskGroupType, null: true do
        description "The updated task group."
    end

    def resolve(task_template_id:, task_group_id:)
        # find the task template and task group
        task_template = find_task_template_or_throw_execution_error(id: task_template_id)
        task_group = find_task_group_or_throw_execution_error(id: task_group_id)
    end
end