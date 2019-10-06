class CasePolicy
    def initialize(user, the_case)
        @user = user
        @case = the_case
    end

    def show?
        false
    end

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