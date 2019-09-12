class Mutations::ChangeDescription < Mutations::BaseMutation
    # the ID of the case, task, or indicator we're changing
    argument :object_id, ID, required: true

    # the new description
    argument :description, String, required: true

    # type of the object we're updating (CASE, TASK, or INDICATOR)
    argument :type, Types::HasDescriptionEnum, required: true

    # the updated case. null if you're not updating a case.
    field :case, Types::CaseType, null: true

    # the updated task. null if you're not updating a task.
    field :task, Types::TaskType, null: true

    # the updated indicator. null if you're not updating a indicator.
    field :indicator, Types::IndicatorType, null: true

    def resolve(object_id:, description:, type:)
        if type === "CASE"
            # find and update the case
            the_case = find_case_or_throw_execution_error(case_id: object_id)
            the_case.description = description

            # save it
            if the_case.save
                { "case": the_case }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        elsif type === "TASK"
            # find and update the task
            the_task = find_task_or_throw_execution_error(task_id: object_id)
            the_task.description = description

            # save it
            if the_task.save
                { "task": the_task }
            else
                raise GraphQL::ExecutionError, the_task.errors.full_messages.join(" | ")
            end
        elsif type === "INDICATOR"
            # find and update the indicator
            the_indicator = find_indicator_or_throw_execution_error(indicator_id: object_id)
            the_indicator.description = description

            # save it
            if the_indicator.save
                { "indicator": the_indicator }
            else
                raise GraphQL::ExecutionError, the_indicator.errors.full_messages.join(" | ")
            end
        end
    end
end