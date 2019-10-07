class Mutations::DeleteStatus < Mutations::BaseMutation
    description "Deletes a status. You cannot delete a status if any cases or tasks have that status."

    argument :name, String, required: true do
        description "The name of the status to delete."
    end

    field :name, String, null: true do
        description "The name of the status that was just deleted."
    end

    def resolve(name:)
        status = find_status_by_name_or_throw_execution_error(status_name: name)

        if status.destroy
            {
                "name": name
            }
        else
            raise GraphQL::ExecutionError, status.errors.full_messages.join(" | ")
        end
    end
end