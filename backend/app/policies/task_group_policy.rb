class TaskGroupPolicy
    def initialize(user, task_group)
        @user = user
        @task_group = task_group
    end

    def user_can_edit_case?
        @task_group.case.case_members.where(user: @user, role: "CAN_EDIT").exists?
    end

    def create?
        user_can_edit_case?
    end

    def update?
        user_can_edit_case?
    end

    def delete?
        user_can_edit_case?
    end
end