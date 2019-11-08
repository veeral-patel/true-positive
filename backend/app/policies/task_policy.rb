class TaskPolicy
    def initialize(user, task)
        @user = user
        @task = task
    end

    def user_can_edit_case?
        # Whether the user is a member of this task's case and has the CAN_EDIT role
        CaseMember.where(case: @task.case, user: @user, role: "CAN_EDIT").exists?
    end

    def rename_task?
        # Only a case's members with a CAN_EDIT role can rename tasks
        user_can_edit_case? 
    end

    def delete_task?
        # Only a case's members with a CAN_EDIT role can delete tasks
        user_can_edit_case?
    end

    def change_status?
        # Only a case's members with a CAN_EDIT role can change tasks' statuses
        user_can_edit_case?
    end

    def change_priority?
        user_can_edit_case?
    end

    def change_assignee?
        user_can_edit_case?
    end

    def change_description?
        user_can_edit_case?
    end

    def create_comment?
        user_can_edit_case?
    end

    def change_comment?
        user_can_edit_case?
    end

    def change_done?
        user_can_edit_case?
    end

    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            # an user can only see the tasks in cases he's a member of
            Task.where(case: @user.joined_cases)
        end
    end
end