class Mutations::UpdateMe < Mutations::BaseMutation
    description "Update the current user's profile."

    argument :username, String, required: false do
        description "Your new username, which must be unique."
    end

    argument :email, String, required: false do
        description "Your new email."
    end

    field :me, Types::UserType, null: true do
        description "Your updated info."
    end

    def resolve(username: nil, email: nil)
        # update me in memory
        me = context[:current_user]
        me.username = username if not username.nil?
        me.email = email if not email.nil?

        # save to the database
        if me.save
            {
                "me": me
            }
        else
            raise GraphQL::ExecutionError, me.errors.full_messages.join(" | ")
        end
    end
end