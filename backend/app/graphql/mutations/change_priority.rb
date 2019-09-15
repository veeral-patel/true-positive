class Mutations::ChangePriority < Mutations::BaseMutation
    description "Change the priority of a case or task."

    # the ID of the case or task whose priority we're changing
    argument :object_id, ID, required: true

    # the ID of the new priority
    argument :priority_id, ID, required: true

    # type of the object we're updating (either CASE or TASK)
    argument :type, Types::HasPriorityEnum, required: true

    # the updated case. null if you're not updating a case.
    field :case, Types::CaseType, null: true

    # the updated task. null if you're not updating a task.
    field :task, Types::TaskType, null: true

    def resolve(object_id:, priority_id:, type:)
        # find the new priority
        new_priority =  find_priority_or_throw_execution_error(priority_id: priority_id)

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