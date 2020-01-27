module Types
    class CaseGroupType < Types::BaseObject
        description "Represents a group added to a case template."
        
        field :role, Types::CaseRoleEnum, null: false do
            description "The group's permission level."
        end

        field :group, Types::GroupType, null: false do
            description "The group itself."
        end
    end
end