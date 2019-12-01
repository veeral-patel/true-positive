module Types
    class ApiTokenType < Types::BaseObject
        description "Describes an token you can use to authenticate to the API."

        # never null ---
        field :id, ID, null: false do
            description "A unique integer identifying this API token."
        end

        field :name, String, null: false do
            description "A brief name describing the API token."
        end

        field :api_token, String, null: false do
            description "The API token itself."
        end
    end
end