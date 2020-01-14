class Mutations::DeleteCreateCaseEmailAddress < Mutations::BaseMutation
    description "Deletes an inbound email address used to create cases."

    argument :id, ID, required: true do
        description "The ID of the inbound email address to delete."
    end
    
    field :id, ID, null: true do
        description "ID of the deleted inbound address."
    end

    def resolve(id:)
        # find the address to destroy
        inbound_address = find_create_case_email_address_or_throw_execution_error(id: id)

        # authorize this action
        unless CreateCaseEmailAddressPolicy.new(context[:current_user], inbound_address).delete?
            raise GraphQL::ExecutionError, "You are not authorized to delete inbound addresses."
        end

        # actually destroy it
        if inbound_address.destroy
            {
                "id": inbound_address.id
            }
        else
            raise GraphQL::ExecutionError, inbound_address.errors.full_messages.join(" | ")
        end
    end
end