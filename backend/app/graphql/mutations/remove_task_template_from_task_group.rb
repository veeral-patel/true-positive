class Mutations::RemoveTaskTemplateFromTaskGroup < Mutations::BaseMutation
    description "Removes a task template from a task group (in a case template)."

    # required ---

    argument :task_template_id, ID, required: true do
        description "ID of the task template to remove."
    end

    argument :case_template_id, ID, required: true do
        description "ID of the case template the task group is in."
    end

    argument :task_group_id, ID, required: true do
        description "ID of the task group to remove this task template from."
    end

    # output ---

    field :task_group, Types::TaskGroupType, null: true do
        description "The updated task group."
    end

    def resolve(task_template_id:, case_template_id:, task_group_id:)
        # find the TT, CT, and task group
        task_template = find_task_template_or_throw_execution_error(id: task_template_id)
        case_template = find_case_template_or_throw_execution_error(id: case_template_id)
        task_group = find_task_group_or_throw_execution_error(id: task_group_id)

        # raise an exception if the TG is not in the CT
        if not case_template.task_groups.include? task_group
            raise GraphQL::ExecutionError, "The case template you specified does not have a task group with ID #{task_group_id}"
        end

        # also, raise an exception if the TT is not in the group
        if not task_group.task_templates.include? task_template
            raise GraphQL::ExecutionError, "#{task_template.name} is not part of this task group."
        end

        # authorize this action
        unless CaseTemplatePolicy.new(context[:current_user], case_template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this case template."
        end

        # remove the TT
        if task_group.task_templates.destroy(task_template)
            { task_group: task_group }
        else
            raise GraphQL::ExecutionError, task_group.errors.full_messages.join(" | ")
        end
    end
end