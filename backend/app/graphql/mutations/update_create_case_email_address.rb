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
    end
end