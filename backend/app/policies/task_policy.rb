class TaskPolicy
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