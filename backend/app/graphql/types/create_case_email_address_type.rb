module Types
    class CreateCaseEmailAddressType < Types::BaseObject
        description "An email address that creates cases from emails that are sent to it."

        # not null ---
        field :id, ID, null: false do
            description "ID uniquely identifying this email address object."
        end

        field :email, String, null: false do
            description "The email address itself."
        end
    end
end