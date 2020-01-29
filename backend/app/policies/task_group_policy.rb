class TaskGroupPolicy
    def initialize(user, task_group)
        @user = user
        @task_group = task_group
    end

    def user_can_edit_case?
        if @task_group.caseable_type == "Case"
            CasePolicy.new(@user, @task_group.caseable).update_case?
        elsif @task_group.caseable_type == "CaseTemplate"
            CaseTemplatePolicy.new(@user, @task_group.caseable).update_template?
        end
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