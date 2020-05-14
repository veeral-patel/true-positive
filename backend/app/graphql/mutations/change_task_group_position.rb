class Mutations::ChangeTaskGroupPosition < Mutations::BaseMutation
    description "Updates the position of a task group in a case or case template."

    argument :id, ID, required: true do
        description "ID of the task group to move."
    end

    argument :position, Int, required: true do
        description "The new position."
    end

    field :task_group, Types::TaskGroupType, null: true do
        description "The updated task group."
    end

    def resolve(id:, position:)
        # find the task group
        task_group = find_task_group_or_throw_execution_error(id: id)

        # authorize this action
        unless TaskGroupPolicy.new(context[:current_user], task_group).update?
            raise GraphQL::ExecutionError, "You are not authorized to move this task group."
        end

        # and update its position
        if task_group.insert_at(position)
            {
                "task_group": task_group
            }
        else
            raise GraphQL::ExecutionError, task_group.errors.full_messages.join(" | ")
        end
    end
end