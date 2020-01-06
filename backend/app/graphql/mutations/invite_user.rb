class Mutations::InviteUser < Mutations::BaseMutation
    description "Invite a user to your True Positive tenant."

    argument :email, String, required: true do
        description "Email address of the user to invite."
    end

    field :user, Types::UserType, null: true do
        description "The invited user."
    end

    def resolve(email:)
        # validate the email address
        if not email =~ URI::MailTo::EMAIL_REGEXP
            raise GraphQL::ExecutionError, "The email you provided doesn't look valid."
        end

        # create the user in memory
        username = email.split("@").first
        user = User.new(username: username, email: email)

        # TODO: authorize this action

        # return the new user
        if user.invite!
            {
                "user": user
            }
        else
            raise GraphQL::ExecutionError, user.errors.full_messages.join(" | ")
        end
    end
end