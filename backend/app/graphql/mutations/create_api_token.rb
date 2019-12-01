class Mutations::CreateApiToken < Mutations::BaseMutation
    description "Creates a new API token."

    # required ---
    argument :name, String, required: true do
        description "A brief name describing the API token's purpose."
    end

    field :api_token, Types::ApiTokenType, null: true do
        description "The newly created API token."
    end

    def resolve(name:)
    end
end