class Mutations::CreateCreateCaseEmailAddress < Mutations::BaseMutation
    description "Create an inbound email address used to create cases."

    field :create_case_email_address, Types::CreateCaseEmailAddressType, null: true do
        description "The newly created inbound email address."
    end

    def resolve
        # create the address in memory
        address = CreateCaseEmailAddress.new(email: "#{SecureRandom.alphanumeric(20)}@inbound-cases.truepositive.app")

        # authorize this action
        unless CreateCaseEmailAddressPolicy.new(context[:current_user], address).create?
            raise GraphQL::ExecutionError, "You are not authorized to create inbound addresses."
        end

        # generate the address
        if address.save
            {
                "create_case_email_address": address
            }
        else
            raise GraphQL::ExecutionError, address.errors.full_messages.join(" | ")
        end
    end
end