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
    end
end