class Mutations::RenameStatus < Mutations::BaseMutation
    description "Changes the name of a status."
    
    argument :old_name, ID, required: true do
        description "The name of the status to rename."
    end

    argument :new_name, String, required: true do
        description "The new status name."
    end

    field :status, Types::StatusType, null: true do
        description "The updated status."
    end

    def resolve(old_name:, new_name:)
        # find the status
        status = find_status_by_name_or_throw_execution_error(status_name: old_name)

        # authorize this action
        unless StatusPolicy.new(context[:current_user], status).rename_status?
            raise GraphQL::ExecutionError, "You are not authorized to rename statuses."
        end

        # update the status in memory
        status.name = new_name

        # and save it
        if status.save
            {
                "status": status
            }
        else
            raise GraphQL::ExecutionError, status.errors.full_messages.join(" | ")
        end
    end
end