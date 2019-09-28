class CasePolicy
    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            if @user.admin?
                # an admin can see all cases
                Case.all
            else
                # an user can see the cases he's a member of.
                @user.joined_cases
            end
        end
    end
end