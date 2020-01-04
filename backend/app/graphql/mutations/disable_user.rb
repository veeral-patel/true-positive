class Mutations::DisableUser < Mutations::BaseMutation
    description "Disable a user."

    argument :username, String, required: false do
        description "The username of the user to disable."
    end

    field :user, Types::UserType, null: true do
        description "The updated user."
    end

    def resolve(username:)
        # find the user to disable
        user = find_user_or_throw_execution_error(username: username)

        # authorize this action
        unless UserPolicy.new(context[:current_user]).disable?
            raise GraphQL::ExecutionError, "You are not authorized to disable this user."
        end

        # disable him
        if user.disable
            {
                "user": user
            }
        else
            raise GraphQL::ExecutionError, user.errors.full_messages.join(" | ")
        end
    end
end