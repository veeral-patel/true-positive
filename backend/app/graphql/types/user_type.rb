module Types
    class UserType < Types::BaseObject
        description "Represents an user"

        field :id, ID, null: false
        field :username, String, null: false
        field :email, String, null: false
    end
end