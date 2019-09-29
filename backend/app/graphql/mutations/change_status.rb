class Mutations::ChangeStatus < Mutations::BaseMutation
    description "Change the status of a case or task."

    argument :object_id, ID, required: true do
        description "The ID of the case or task whose status we're updating."
    end

    argument :name, ID, required: true do
        description "The name of the new status (eg, Open)"
    end

    argument :type, Types::HasStatusEnum, required: true do
        description "Whether we're updating a case or a task."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case. Is null if you're not updating a case."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task. Is null if you're not updating a task."
    end

    def resolve(object_id:, name:, type:)
        # find the new status
        new_status =  find_status_by_name_or_throw_execution_error(status_name: name)

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