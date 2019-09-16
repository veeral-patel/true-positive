class Mutations::ChangeAssignee < Mutations::BaseMutation
    description "Assign a case or a task to an user."

    argument :object_id, ID, required: true do
        description "The ID of the case or task."
    end

    argument :user_id, ID, required: true do
        description "The ID of the user to assign."
    end

    argument :type, Types::IsAssignableEnum, required: true do
        description "Whether we're updating a case or a task."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case. Is null is you're not assigning a case."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task. Is null if you're not assigning a task."
    end

    def resolve(object_id:, user_id:, type:)
        # find the new assignee
        user = find_user_or_throw_execution_error(user_id: user_id)

        # changing the type of a task
        if type === "CASE"
            # find the case and user
            the_case = find_case_or_throw_execution_error(case_id: object_id)

            # assign the case
            the_case.assigned_to = user

            # and save it
            if the_case.save
                {
                    "case": the_case
                }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        # changing the status of a task
        elsif type === "TASK"
            # find and update the task
            the_task = find_task_or_throw_execution_error(task_id: object_id)

            # assign the task
            the_task.assigned_to = user

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