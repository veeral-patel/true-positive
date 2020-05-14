class Mutations::CreateTaskGroup < Mutations::BaseMutation
    description "Adds a new task group to a case or case template."

    # required ---

    argument :name, String, required: true do
        description "The name of the new task group."
    end
     
    # not required ---

    argument :case_id, ID, required: false do
        description "The ID of the case to add this task group to."
    end

    argument :case_template_id, ID, required: false do
        description "The ID of the case template to add this task to."
    end

    field :task_group, Types::TaskGroupType, null: true do
        description "The newly created task group."
    end

    def resolve(name:, case_id: nil, case_template_id: nil)
        # ensure exactly one of case_id and case_template_id are provided
        if (case_id.nil? && case_template_id.nil?) || ((not case_id.nil?) && (not case_template_id.nil?))
            raise GraphQL::ExecutionError, "Please provide either a caseId or caseTemplateId argument (but not both)."
        end

        # find the case/CT for this new task group
        if case_id.nil?
            caseable = find_case_template_or_throw_execution_error(id: case_template_id)
        else
            caseable = find_case_or_throw_execution_error(case_id: case_id)
        end

        # create a new task group in memory
        new_task_group = context[:current_user].created_task_groups.new(name: name, caseable: caseable)

        # authorize this action
        unless TaskGroupPolicy.new(context[:current_user], new_task_group).create?
            raise GraphQL::ExecutionError, "You are not authorized to create this task group."
        end

        # save it to the database
        if new_task_group.save
            { "task_group": new_task_group }
        else
            raise GraphQL::ExecutionError, new_task_group.errors.full_messages.join(" | ") 
        end
    end
end