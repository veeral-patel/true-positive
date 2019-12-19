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
        CaseMember.where(case: the_case, user: @user, role: "CAN_EDIT").exists?
    end

    def user_can_edit_this_case?
        user_can_edit_specified_case?(@case)  
    end

    def update_case?
        user_can_edit_this_case?
    end

    def add_member?
        user_can_edit_this_case?
    end

    def remove_member?
        user_can_edit_this_case? 
    end

    def create_task?
        user_can_edit_this_case? 
    end

    def rename_case?
        user_can_edit_this_case? 
    end

    def change_role?
        user_can_edit_this_case? 
    end

    def change_status?
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

    def can_merge_into?(parent_case: nil)
        # You can merge this case into PARENT_CASE if you can edit both cases.
        can_edit_child_case =  user_can_edit_this_case?

        if parent_case.nil?
            return can_edit_child_case
        else
            can_edit_parent_case = user_can_edit_specified_case?(parent_case)
            can_edit_child_case && can_edit_parent_case
        end
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