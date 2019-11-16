class Mutations::ChangeEmail < Mutations::BaseMutation
    description "Update the current user's email address"

    argument :email, String, required: true do
        description "Your new email address."
    end

    field :me, Types::UserType, null: true do
        description "Updated information about you."
    end

    def resolve(email:)
        # update me in memory
        me = context[:current_user]
        me.email = email

        # and save to the database
        if me.save
            {
                "me": me
            }
        else
            raise GraphQL::ExecutionError, me.errors.full_messages.join(" | ")
        end
    end
end