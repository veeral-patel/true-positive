class TaskGroupPolicy
    def initialize(user, task_group)
        @user = user
        @task_group = task_group
    end

    def user_can_edit_case?
        # Whether the user is a member of this group's case and has the CAN_EDIT role
        CaseMember.where(case: @task_group.case, user: @user, role: "CAN_EDIT").exists?
    end

    def update?
        user_can_edit_case?
    end
end