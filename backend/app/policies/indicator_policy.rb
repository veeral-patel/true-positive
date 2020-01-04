class IndicatorPolicy
    def initialize(user, indicator)
        @user = user
        @indicator = indicator
    end

    def user_can_edit_case?
        @indicator.case.case_members.where(user: @user, role: "CAN_EDIT").exists?
    end

    def create_indicator?
        user_can_edit_case?
    end

    def view_comment?
        @indicator.case.has_member(@user)
    end

    def update_indicator?
        user_can_edit_case?
    end

    def create_comment?
        user_can_edit_case?
    end

    def change_comment?
        user_can_edit_case?
    end

    def delete_indicator?
        user_can_edit_case?
    end

    def rename_indicator?
        user_can_edit_case?
    end

    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            # an user can only see the tasks in cases he's a member of
            Indicator.where(case: @user.joined_cases)
        end
    end
end