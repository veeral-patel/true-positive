module Types
    class ApiTokenType < Types::BaseObject
        description "Describes an token you can use to authenticate to the API."

        # never null ---
        field :name, String, null: false do
            description "A brief name describing the API token."
        end
    end
end