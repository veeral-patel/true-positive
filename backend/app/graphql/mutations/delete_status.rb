class Mutations::DeleteStatus < Mutations::BaseMutation
    description "Deletes a status. You cannot delete a status if any cases or tasks have that status."

    argument :id, ID, required: true

    # ID of the deleted status 
    field :id, ID, null: false

    def resolve(id:)
        status = find_status_or_throw_execution_error(status_id: id)

        if status.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, status.errors.full_messages.join(" | ")
        end
    end
end