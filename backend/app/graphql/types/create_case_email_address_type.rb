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

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
            description "When this inbound address was created."
        end

        field :created_by, Types::UserType, null: false do
          description "The user who created this inbound address."  
        end
    end
end