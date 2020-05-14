class Mutations::DeleteTaskGroup < Mutations::BaseMutation
    description "Delete a task group (and any tasks in it)."

    argument :id, ID, required: true do
        description "The ID of the task group to delete."    
    end

    field :id, ID, null: true do
        description "The ID of the task group that was just deleted."
    end

    def resolve(id:)
        task_group = find_task_group_or_throw_execution_error(id: id)

        # authorize this action
        unless TaskGroupPolicy.new(context[:current_user], task_group).delete?
            raise GraphQL::ExecutionError, "You are not authorized to delete task groups in this case."
        end

        # delete the task group
        if task_group.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, task_group.errors.full_messages.join(" | ")
        end
    end
end