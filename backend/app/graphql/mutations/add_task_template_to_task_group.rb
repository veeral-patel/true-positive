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

        # authorize this action

        # if a task_group_id is provided, then find the task group corresponding to that ID

            # also ensure that the task group we found is in the case template we found
        
        # if a task_group_id is not provided, then create a new task group in the case template

        # attempt to create a new association between the task group and the task template we found

        # if we fail, then raise a GraphQL execution error
    end
end