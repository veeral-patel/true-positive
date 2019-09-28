class TaskPolicy
    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            if @user.admin?
                # an admin can see all the tasks
                Task.all
            else
                # an user can only see the tasks in cases he's a member of
                Task.where(case: @user.joined_cases)
            end
        end
    end
end