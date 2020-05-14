class Mutations::ChangeUsername < Mutations::BaseMutation
    description "Update the current user's username."

    argument :username, String, required: true do
        description "Your new username. No existing user can have this username."
    end

    field :me, Types::UserType, null: true do
        description "Updated information about you."
    end

    def resolve(username:)
        # update me in memory
        me = context[:current_user]
        me.username = username

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