class Mutations::ChangeStatus < Mutations::BaseMutation
    # the ID of the case or task whose status we're changing
    argument :object_id, ID, required: true

    # the ID of the new status
    argument :status_id, ID, required: true

    # type of the object we're updating (either case or task)
    argument :type, Types::HasStatusEnum, required: true

    # the updated case. null if you're not updating a case.
    field :case, Types::CaseType, null: true

    # the updated task. null if you're not updating a task.
    field :task, Types::TaskType, null: true

    def resolve(object_id:, status_id:, type:)
        # find the new status
        new_status =  find_status_or_throw_execution_error(status_id: status_id)

        # changing the status of a case
        if type === "CASE"
            # find and update the case
            the_case = find_case_or_throw_execution_error(case_id: object_id)
            the_case.status = new_status

            # save it
            if the_case.save
                {
                    "case": the_case
                }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        elsif type === "TASK" # changing the status of a task
            # find and update the task
            the_task = find_task_or_throw_execution_error(task_id: object_id)
            the_task.status = new_status

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