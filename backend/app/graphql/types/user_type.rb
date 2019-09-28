module Types
    class UserType < Types::BaseObject
        description "Represents an user"

        field :id, ID, null: false do
            description "An unique integer identifying this user."
        end

        field :username, String, null: false do
            description "The user's username."
        end

        field :email, String, null: false do
            description "The user's email address."
        end

        field :admin, Boolean, null: false do
            description "Whether this user is an administrator. Administrators can view, edit, or delete any case, manage users, and adjust global settings (like customizing statuses)."
        end
    end
end