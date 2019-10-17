class Mutations::CreateStatus < Mutations::BaseMutation
    description "Add a status. Any case can now be given this status."

    argument :name, String, required: true do
        description "The name of the status to create (such as 'Open')."
    end

    argument :description, String, required: false do
        description "Some optional information describing this status."
    end

    field :status, Types::StatusType, null: true do
        description "The newly created status."
    end

    def resolve(name:, description: nil)
        # create the status in memory
        status = Status.new(name: name, description: description)

        # authorize this action
        unless StatusPolicy.new(context[:current_user], status).create_status?
            raise GraphQL::ExecutionError, "You are not authorized to create statuses."
        end

        # save it
        if status.save
            {
                "status": status
            }
        else
            raise GraphQL::ExecutionError, status.errors.full_messages.join(" | ")
        end
    end
end
