class TaskGroupPolicy
    def initialize(user, task_group)
        @user = user
        @task_group = task_group
    end

    def user_can_edit_case?
        @task_group.caseable.case_members.where(user: @user, role: "CAN_EDIT").exists?
    end

    def create?
        if @task_group.caseable_type == "Case"
            user_can_edit_case?
        elsif @task_group.caseable_type == "CaseTemplate"
            CaseTemplatePolicy.new(@user, @task_group.caseable).update_template?
        else
            false
        end
    end

    def update?
        if @task_group.caseable_type == "Case"
            user_can_edit_case?
        elsif @task_group.caseable_type == "CaseTemplate"
            CaseTemplatePolicy.new(@user, @task_group.caseable).update_template?
        else
            false
        end
    end

    def delete?
        if @task_group.caseable_type == "Case"
            user_can_edit_case?
        elsif @task_group.caseable_type == "CaseTemplate"
            CaseTemplatePolicy.new(@user, @task_group.caseable).update_template?
        else
            false
        end
    end
end