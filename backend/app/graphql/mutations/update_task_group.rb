class Mutations::UpdateTaskGroup < Mutations::BaseMutation
    description "Update a task group."

    argument :id, ID, required: true do
        description "ID of the task group to update."
    end

    argument :name, String, required: false do
        description "New task group name."
    end

    field :task_group, Types::TaskGroupType, null: true do
        description "The updated task group."
    end

    def resolve(id:, name: nil)
        # find and update the task group in memory
        task_group = find_task_group_or_throw_execution_error(id: id)
        if not name.nil?
            task_group.name = name
        end

        # authorize this action
        unless TaskGroupPolicy.new(context[:current_user], task_group).update?
            raise GraphQL::ExecutionError, "You are not authorized to update task groups in this case."
        end

        # save the updated task group
        if task_group.save
            {
                "task_group": task_group
            }
        else
            raise GraphQL::ExecutionError, task_group.errors.full_messages.join(" | ")
        end
    end
end