class Mutations::DeleteApiToken < Mutations::BaseMutation
    description "Deletes an API token."

    # required ---
    argument :id, ID, required: true do
        description "The ID of the API token to delete."
    end

    field :id, ID, null: true do
        description "The ID of the API token that was just deleted."
    end

    def resolve(id:)
        api_token = find_api_token_or_throw_execution_error(id: id)

        # authorize this action
        unless ApiTokenPolicy.new(context[:current_user], api_token).delete_token?
            raise GraphQL::ExecutionError, "You are not authorized to delete this API token."
        end

        if api_token.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, api_token.errors.full_messages.join(" | ")
        end
    end
end