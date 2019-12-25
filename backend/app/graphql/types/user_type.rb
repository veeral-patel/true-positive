module Types
    class UserType < Types::BaseObject
        description "Represents an user."

        field :username, String, null: false do
            description "The user's username."
        end

        field :email, String, null: false do
            description "The user's email address."
        end
    end
end