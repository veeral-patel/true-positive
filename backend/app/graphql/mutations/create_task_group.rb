class Mutations::CreateTaskGroup < Mutations::BaseMutation
    description "Adds a new task group to a case."

    argument :name, String, required: true do
        description "The name of the new task group."
    end

    argument :case_id, ID, required: true do
        description "The ID of the case to add this task group to."
    end

    field :task_group, Types::TaskGroupType, null: true do
        description "The newly created task group."
    end

    def resolve(name:, case_id:)
        # find the case for this new task group
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # create a new task group in memory
        new_task_group = context[:current_user].created_task_groups.new(name: name, caseable: the_case)

        # authorize this action
        unless TaskGroupPolicy.new(context[:current_user], new_task_group).create?
            raise GraphQL::ExecutionError, "You are not authorized to add task groups to this case."
        end

        # save it to the database
        if new_task_group.save
            { "task_group": new_task_group }
        else
            raise GraphQL::ExecutionError, new_task_group.errors.full_messages.join(" | ") 
        end
    end
end