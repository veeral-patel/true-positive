class Types::CaseRoleEnum < Types::BaseEnum
    description "Indicates a permission level a case member can possess."

    value "CAN_VIEW" do
        description "The user can only view the case."
    end

    value "CAN_EDIT" do
        description "The user can edit the case."
    end
end