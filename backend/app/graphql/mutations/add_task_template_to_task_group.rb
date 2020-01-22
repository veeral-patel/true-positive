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
    end
end