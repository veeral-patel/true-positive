class CasePolicy
    def initialize(user, the_case)
        @user = user
        @case = the_case
    end

    def create_case?
        # Anyone can create a case.
        true
    end

    def show_case?
        # Only a case's members can view it
        @case.has_member(@user)
    end

    def user_can_edit_specified_case?(the_case)
        # Whether the user is a member of THE_CASE and has the CAN_EDIT role
        CaseMember.where(case: the_case, user: @user, role: "CAN_EDIT").exists?
    end

    def user_can_edit_this_case?
        # Whether the user is a member of this case and has the CAN_EDIT role
        user_can_edit_specified_case?(@case)  
    end

    def add_member?
        # Only a case's members with a CAN_EDIT role can add members
        user_can_edit_this_case?
    end

    def remove_member?
        # Only a case's members with a CAN_EDIT role can remove members
        user_can_edit_this_case? 
    end

    def create_task?
        # Only a case's members with a CAN_EDIT role can remove members
        user_can_edit_this_case? 
    end

    def rename_case?
        # Only a case's members with a CAN_EDIT role can rename the case
        user_can_edit_this_case? 
    end

    def change_role?
        # Only a case's members with a CAN_EDIT role can change another member's role
        user_can_edit_this_case? 
    end

    def change_status?
        # Only a case's members with a CAN_EDIT role can change the case's status
        user_can_edit_this_case? 
    end

    def change_priority?
        user_can_edit_this_case? 
    end

    def change_assignee?
        user_can_edit_this_case?
    end

    def change_description?
        user_can_edit_this_case?
    end

    def change_tags?
        user_can_edit_this_case?
    end

    def delete_case?
        user_can_edit_this_case?
    end

    def can_merge_into?(parent_case)
        # You can merge this case into PARENT_CASE if you can edit both cases.
        can_edit_child_case =  user_can_edit_this_case?
        can_edit_parent_case = user_can_edit_specified_case?(parent_case)
        can_edit_child_case && can_edit_parent_case
    end

    def create_comment?
        user_can_edit_this_case?
    end

    def change_comment?
        user_can_edit_this_case?
    end

    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            # An user can see the cases he's a member of.
            @user.joined_cases
        end
    end
end