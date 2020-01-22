module Types
    class TaskGroupType < Types::BaseObject
        description "A group of tasks (in a case) or task templates (in a case template)."

        # never null
        field :id, ID, null: false do
            description "A unique integer identifying this task group."
        end

        field :name, String, null: false do
            description "This task group's name."
        end

        field :tasks, [Types::TaskType], null: false do
            description "The tasks in this group."
        end

        field :task_templates, [Types::TaskTemplateType], null: false do
            description "The task templates in this group."
        end
    end
end