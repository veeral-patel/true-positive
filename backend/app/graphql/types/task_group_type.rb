module Types
    class TaskGroupType < Types::BaseObject
        description "A category of tasks in a case. You might categorize tasks into Triage and Remediate, for example."

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
    end
end