class Mutations::AddTaskTemplateToTaskGroup < Mutations::BaseMutation
    description "Add a task template to a task group (in a case template)."

    # required ---

    argument :task_template_id, ID, required: true do
        description "ID of the task template to add."
    end

    argument :case_template_id, ID, required: true do
        description "ID of the case template to add it to."
    end

    # not required ---

    argument :task_group_id, ID, required: false do
        description "ID of the task group to add this template to."
    end

    # output ---

    field :case_template, Types::CaseTemplateType, null: true do
        description "The updated case template."
    end

    def resolve(task_template_id:, case_template_id:, task_group_id: nil)
        # find the task_template and case template
        task_template = find_task_template_or_throw_execution_error(id: task_template_id)
        case_template = find_case_template_or_throw_execution_error(id: case_template_id)

        # authorize this action
        unless CaseTemplatePolicy.new(context[:current_user], case_template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this case template."
        end

        task_group = nil

        if task_group_id.nil?
            # if a task_group_id is not provided, then create a new task group in the case template
            task_group = TaskGroup.create(
                created_by: context[:current_user],
                name: "General",
                caseable: case_template
            )
        else
            # if a task_group_id is provided, then find the task group corresponding to that ID
            task_group = find_task_group_or_throw_execution_error(id: task_group_id)

            # also ensure that the task group we found is in the case template we found
            if not case_template.task_groups.include? task_group
                raise GraphQL::ExecutionError, "The case template you specified does not have a task group with ID #{task_group_id}"
            end
        end

        # attempt to create a new association between the task group and the task template we found
        if TaskGroupTaskTemplate.create(task_group: task_group, task_template: task_template)
            { case_template: case_template }
        else
            raise GraphQL::ExecutionError, case_template.errors.full_messages.join(" | ") 
        end
    end
end