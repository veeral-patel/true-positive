module Types
    class UserType < Types::BaseObject
        description "Represents an user"

        field :id, ID, null: false do
            description "An unique integer identifying this user."
        end

        field :username, String, null: false do
            description "The user's unique username."
        end

        field :email, String, null: false do
            description "The user's email address."
        end
    end
end