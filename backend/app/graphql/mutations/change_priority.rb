class Mutations::ChangePriority < Mutations::BaseMutation
    description "Update the priority of a case or task."

    argument :object_id, ID, required: true do
        description "The ID of the case or task whose priority we're updating."
    end

    argument :priority, ID, required: true do
        description "The name of the new priority (eg, Critical)."
    end

    argument :type, Types::HasPriorityEnum, required: true do
        description "Whether we're updating a case or a task."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case. Is null if you're not updating a case."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task. Is null if you're not updating a task."
    end

    def resolve(object_id:, name:, type:)
        # find the new priority
        new_priority =  find_priority_by_name_or_throw_execution_error(priority_name: name)

        # changing the priority of a case
        if type === "CASE"
            # find and update the case
            the_case = find_case_or_throw_execution_error(case_id: object_id)
            the_case.priority = new_priority

            # save it
            if the_case.save
                {
                    "case": the_case
                }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        elsif type === "TASK" # changing the priority of a task
            # find and update the task
            the_task = find_task_or_throw_execution_error(task_id: object_id)
            the_task.priority = new_priority

            # save it
            if the_task.save
                {
                    "task": the_task
                }
            else
                raise GraphQL::ExecutionError, the_task.errors.full_messages.join(" | ")
            end
        end
    end
end