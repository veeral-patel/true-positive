class TaskGroupPolicy
    def initialize(user, task_group)
        @user = user
        @task_group = task_group
    end

    def user_can_edit_case?
        CaseMember.where(case: @task_group.case, user: @user, role: "OWNER").exists?
    end

    def update?
        user_can_edit_case?
    end
end