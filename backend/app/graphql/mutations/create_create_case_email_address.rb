class Mutations::CreateCreateCaseEmailAddress < Mutations::BaseMutation
    description "Create an inbound email address used to create cases."

    argument :case_template_id, ID, required: true do
        description "ID of the case template to use to initialize cases created from emails sent to this address."
    end

    argument :default_creator, String, required: true do
        description "Username of the user to mark as the creator of cases created from emails sent to this address."
    end

    field :create_case_email_address, Types::CreateCaseEmailAddressType, null: true do
        description "The newly created inbound email address."
    end

    def resolve(case_template_id:, default_creator:)
        # find case template, default creator
        case_template = find_case_template_or_throw_execution_error(id: case_template_id)
        default_creator = find_user_or_throw_execution_error(username: default_creator)

        # create the address in memory
        address = CreateCaseEmailAddress.new(
            email: "#{SecureRandom.alphanumeric(20)}@inbound-cases.truepositive.app",
            case_template: case_template,
            default_creator: default_creator,
            created_by: context[:current_user]
        )

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