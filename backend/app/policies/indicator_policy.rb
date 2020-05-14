class IndicatorPolicy
    def initialize(user, indicator)
        @user = user
        @indicator = indicator
    end

    def user_can_edit_case?
        CasePolicy.new(@user, @indicator.case).update_case?
    end

    def show_indicator?
        CasePolicy.new(@user, @indicator.case).show_case?
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

    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            # an user can only see the tasks in cases he's a member of
            Indicator.all.select { |indicator| IndicatorPolicy.new(@user, indicator).show_indicator? }
        end
    end
end