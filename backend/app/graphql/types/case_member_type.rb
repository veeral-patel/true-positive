module Types
    class CaseMemberType < Types::BaseObject
        description "Represents a member of a case"

        field :id, ID, null: false
        field :role, String, null: false
        field :user, Types::UserType, null: false
    end
end