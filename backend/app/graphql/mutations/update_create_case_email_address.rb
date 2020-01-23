class Mutations::UpdateCreateCaseEmailAddress < Mutations::BaseMutation
    description "Update an inbound email address used to create cases."

    # required ---
    argument :id, ID, required: true do
        description "ID of the inbound address to update."    
    end

    # not required ---
    argument :case_template_id, ID, required: false do
        description "ID of the new case template to use to initialize cases created from emails sent to this inbound address."
    end

    argument :default_creator, String, required: true do
        description "Username of the new user to mark as the creator of cases created from emails to this inbound address."
    end

    # output ---
    field :create_case_email_address, Types::CreateCaseEmailAddressType, null: true do
        description "The updated inbound address."
    end

    def resolve(id:, case_template_id: nil, default_creator: nil)
        # find the inbound address
        inbound_address = find_create_case_email_address_or_throw_execution_error(id: id)

        # authorize this action
        unless CreateCaseEmailAddressPolicy.new(context[:current_user], inbound_address).update?
            raise GraphQL::ExecutionError, "You are not authorized to update this inbound address."
        end

        # update the inbound address in memory
        inbound_address.case_template_id = case_template_id if not case_template_id.nil?

        unless default_creator.nil?
            inbound_address.default_creator = find_user_or_throw_execution_error(username: default_creator)
        end

        # and save the inbound address
        if inbound_address.save
            {
                "create_case_email_address": inbound_address
            }
        else
            raise GraphQL::ExecutionError, inbound_address.errors.full_messages.join(" | ")
        end
    end
end