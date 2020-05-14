module Types
    class CaseMemberType < Types::BaseObject
        description "Represents a member of a case"

        field :role, Types::CaseRoleEnum, null: false do
            description "The user's permission level."
        end

        field :user, Types::UserType, null: false do
            description "The user itself."
        end
    end
end