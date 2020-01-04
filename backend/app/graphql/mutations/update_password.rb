class Mutations::UpdatePassword < Mutations::BaseMutation
    description "Update the current user's password."

    argument :current_password, String, required: true do
        description "Your old password."
    end

    argument :new_password, String, required: true do
        description "Your new password."
    end

    field :me, Types::UserType, null: false do
        description "Your updated info."
    end

    def resolve(current_password:, new_password:)
        me = context[:current_user]

        # raise error if current_password isn't correct
        if not me.authentication?(current_password)
            raise GraphQL::ExecutionError, "The current password you provided is invalid."
        end

        # change the user's password to new_password in memory
        me.password = new_password

        # authz not needed; any user can update his own info

        # save the user
        if me.save
            {
                "me": me
            }
        else
            raise GraphQL::ExecutionError, me.errors.full_messages.join(" | ")
        end
    end
end