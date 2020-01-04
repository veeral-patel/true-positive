module Types
    class UserType < Types::BaseObject
        description "Represents an user."

        # not null ---

        field :username, String, null: false do
            description "The user's username."
        end

        field :email, String, null: false do
            description "The user's email address."
        end
        
        field :disabled, Boolean, null: false do
            description "Whether this user is disabled."
        end

        # possibly null ---
        field :disabled_at, GraphQL::Types::ISO8601DateTime, null: true do
            description "When this user was disabled."
        end
    end
end