class Mutations::DeleteCreateCaseEmailAddress < Mutations::BaseMutation
    description "Deletes an inbound email address used to create cases."

    argument :id, ID, required: true do
        description "The ID of the inbound email address to delete."
    end
    
    field :id, ID, null: true do
        description "ID of the deleted inbound address."
    end

    def resolve(id:)
        inbound_address = find_create_case_email_address_or_throw_execution_error(id: id)

        # TODO: authorize this action

        if inbound_address.destroy
            {
                "id": inbound_address.id
            }
        else
            raise GraphQL::ExecutionError, inbound_address.errors.full_messages.join(" | ")
        end
    end
end