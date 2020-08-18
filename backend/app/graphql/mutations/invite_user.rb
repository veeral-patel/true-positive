class Mutations::InviteUser < Mutations::BaseMutation
    description "Invite a user"

    argument :email, String, required: true do
        description "Email address of the user to invite."
    end

    field :email, String, null: true do
        description "Email address of the invited user."
    end

    def resolve(email:)
        # authorize this action
        unless UserPolicy.new(context[:current_user]).invite?
            raise GraphQL::ExecutionError, "You are not authorized to invite users."
        end

        # invite the user
        if UserService::Invite.run(email: email)
            {
                "email": email
            }
        else
            raise GraphQL::ExecutionError, user.errors.full_messages.join(" | ")
        end
    end
end