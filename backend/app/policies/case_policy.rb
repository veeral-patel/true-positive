class CasePolicy
    def initialize(user, the_case)
        @user = user
        @case = the_case
    end

    def create?
        # Anyone can create a case.
        true
    end

    def show?
        # Only a case's members can view it
        @case.has_member(@user)
    end

    def user_can_edit_case?
        # Whether the user is a member of the case and has the CAN_EDIT role
        CaseMember.where(case: @case, user: @user, role: "CAN_EDIT").exists?
    end

    def add_member?
        # Only a case's members with a CAN_EDIT role can add members
        user_can_edit_case?
    end

    def remove_member?
        # Only a case's members with a CAN_EDIT role can remove members
        user_can_edit_case? 
    end

    def create_task?
        # Only a case's members with a CAN_EDIT role can remove members
        user_can_edit_case? 
    end

    def rename_case?
        # Only a case's members with a CAN_EDIT role can rename the case
        user_can_edit_case? 
    end

    def change_role?
        # Only a case's members with a CAN_EDIT role can change another member's role
        user_can_edit_case? 
    end

    def change_status?
        # Only a case's members with a CAN_EDIT role can change the case's status
        user_can_edit_case? 
    end

    def change_assignee?
        user_can_edit_case?
    end

    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            # an user can see the cases he's a member of.
            @user.joined_cases
        end
    end
end