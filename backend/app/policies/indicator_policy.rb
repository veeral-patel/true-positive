class IndicatorPolicy
    def initialize(user, indicator)
        @user = user
        @indicator = indicator
    end

    def user_can_edit_case?
        # Whether the user is a member of this status's case and has the CAN_EDIT role
        CaseMember.where(case: @indicator.case, user: @user, role: "CAN_EDIT").exists?
    end

    def change_description?
        user_can_edit_case?
    end
end