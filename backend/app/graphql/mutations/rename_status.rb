class Mutations::RenameStatus < Mutations::BaseMutation
    description "Changes the name of a status."
    
    argument :id, ID, required: true do
        description "The ID of the status to rename."
    end

    argument :name, String, required: true do
        description "The new status name."
    end

    field :status, Types::StatusType, null: false do
        description "The updated status."
    end

    def resolve(id:, name:)
        # find and update the status
        status = find_status_or_throw_execution_error(status_id: id)
        status.name = name

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