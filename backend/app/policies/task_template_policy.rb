class TaskTemplatePolicy
    def initialize(user, task_template)
        @user = user
        @task_template = task_template
    end

    def create_template?
        # Anyone can create a task template
        true
    end

    def delete_template?
        # Anyone can delete a task template
        true
    end
end