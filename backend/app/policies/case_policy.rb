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
        # Only a case's members, or users in a group with access to the case, can view it
        @case.has_member(@user) || @case.is_a_member_of_a_group_with_access(@user)
    end

    def view_comment?
        show_case?
    end

    def user_can_edit_specified_case?(the_case)
        user_is_a_member_with_edit_access = the_case.case_members.where(user: @user, role: "CAN_EDIT").exists?

        user_is_a_member_of_a_group_with_edit_access = the_case.case_groups.select { |cgroup| cgroup.role == "CAN_EDIT" && cgroup.group.users.include?(@user) }.count >= 1

        user_is_a_member_with_edit_access || user_is_a_member_of_a_group_with_edit_access
    end

    def user_can_edit_this_case?
        user_can_edit_specified_case?(@case)  
    end

    def update_case?
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
            Case.all.select { |the_case| CasePolicy.new(@user, the_case).show_case? } 
        end
    end
end