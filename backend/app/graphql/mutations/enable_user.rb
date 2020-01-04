class Mutations::EnableUser < Mutations::BaseMutation
    description "Update whether an user is enabled."

    argument :username, String, required: true do
        description "The username of the user to enable/disable."
    end

    argument :enabled, Boolean, required: true do
        description "If true, enable the user; if false, disable him."
    end

    field :user, Types::UserType, null: true do
        description "The updated user."
    end

    def resolve(username:, enabled:)
        # find the user to enable/disable
        user = find_user_or_throw_execution_error(username: username)

        # authorize this action
        unless UserPolicy.new(context[:current_user]).update_enabled?
            raise GraphQL::ExecutionError, "You are not authorized to enable/disable this user."
        end

        # enable/disable him
        if user.change_enabled(enabled)
            {
                "user": user
            }
        else
            raise GraphQL::ExecutionError, user.errors.full_messages.join(" | ")
        end
    end
end