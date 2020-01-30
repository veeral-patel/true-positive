class TaskPolicy
    def initialize(user, task)
        @user = user
        @task = task
    end

    def user_can_edit_case?
        CasePolicy.new(@user, @task.case).update_case?
    end

    def view_comment?
        @task.case.has_member(@user)
    end

    def update_task?
        user_can_edit_case?
    end

    def delete_task?
        user_can_edit_case?
    end

    def create_comment?
        user_can_edit_case?
    end

    def change_comment?
        user_can_edit_case?
    end

    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            # an user can only see the tasks in cases he's a member of
            # this will get very slow as the number of tasks increases
            Task.select { |task| @user.joined_cases.include? task.case }
        end
    end
end