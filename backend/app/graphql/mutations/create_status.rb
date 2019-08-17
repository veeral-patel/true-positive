class Mutations::CreateStatus < Mutations::BaseMutation
    argument :name, String, required: true
    argument :description, String, required: false

    field :status, Types::StatusType, null: false

    def resolve(name:, description: nil)
        status = Status.new(name: name, description: description)

        if status.save
            {
                "status": status
            }
        else
            raise GraphQL::ExecutionError, status.errors.full_messages.join(" | ")
        end
    end
end
