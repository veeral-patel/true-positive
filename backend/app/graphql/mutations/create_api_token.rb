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
        # create a new task in memory
        new_token = context[:current_user].api_tokens.new(
            name: name,
            api_token: SecureRandom.alphanumeric(40)
        )

        # authorize this action
        unless ApiTokenPolicy.new(context[:current_user], new_token).create_token?
            raise GraphQL::ExecutionError, "You are not authorized to create this API token."
        end

        # and save it to the database
        if new_token.save
            {
                "api_token": new_token
            }
        else
            raise GraphQL::ExecutionError, new_token.errors.full_messages.join(" | ") 
        end
    end
end