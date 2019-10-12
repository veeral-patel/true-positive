class Mutations::ChangeTags < Mutations::BaseMutation
    description "Update the tags of a case, task, or indicator."

    argument :object_id, ID, required: true do
        description "The ID of the case, task, or indicator that we're updating."
    end

    argument :tags, [String], required: true do
        description "The new list of tags."
    end

    argument :type, Types::HasDescriptionEnum, required: true do
        description "Whether we're updating a case, task, or indicator."
    end

    # the updated case. null if you're not updating a case.
    field :case, Types::CaseType, null: true do
        description "The updated case. Is null if you're not updating a case."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task. Is null if you're not updating a task."
    end

    field :indicator, Types::IndicatorType, null: true do
        description "The updated indicator. Is null if you're not updating a indicator."
    end

    def resolve(object_id:, tags:, type:)
        if type == "CASE"
            # find and update the case
            the_case = find_case_or_throw_execution_error(case_id: object_id)
            the_case.tag_list = tags

            # save it
            if the_case.save
                { "case": the_case }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        elsif type == "TASK"
            # find and update the task
            the_task = find_task_or_throw_execution_error(task_id: object_id)
            the_task.tag_list = tags

            # save it
            if the_task.save
                { "task": the_task }
            else
                raise GraphQL::ExecutionError, the_task.errors.full_messages.join(" | ")
            end
        elsif type == "INDICATOR"
            # find and update the indicator
            the_indicator = find_indicator_or_throw_execution_error(indicator_id: object_id)
            the_indicator.tag_list = tags

            # save it
            if the_indicator.save
                { "indicator": the_indicator }
            else
                raise GraphQL::ExecutionError, the_indicator.errors.full_messages.join(" | ")
            end
        end
    end
end