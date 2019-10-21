class Mutations::ChangeAssignee < Mutations::BaseMutation
    description "Assign a case or a task to an user."

    argument :object_id, ID, required: true do
        description "The ID of the case or task."
    end

    argument :type, Types::IsAssignableEnum, required: true do
        description "Whether we're updating a case or a task."
    end

    argument :username, String, required: false do
        description "The username of the user to assign. If empty, the case/task will be assigned to no one."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case. Is null is you're not assigning a case."
    end

    field :task, Types::TaskType, null: true do
        description "The updated task. Is null if you're not assigning a task."
    end

    def resolve(object_id:, username: nil, type:)
        # find the new assignee
        if username.nil?
            user = nil
        else
            user = find_user_or_throw_execution_error(username: username)
        end

        # changing the type of a task
        if type == "CASE"
            # find the case and user
            the_case = find_case_or_throw_execution_error(case_id: object_id)

            # authorize this action
            unless CasePolicy.new(context[:current_user], the_case).change_assignee?
                raise GraphQL::ExecutionError, "You are not authorized to change this case's assignee."
            end

            # update the case in memory
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
        elsif type == "TASK"
            # find and update the task
            the_task = find_task_or_throw_execution_error(task_id: object_id)

            # authorize this action
            unless TaskPolicy.new(context[:current_user], the_task).change_assignee?
                raise GraphQL::ExecutionError, "You are not authorized to change this task's assignee."
            end

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