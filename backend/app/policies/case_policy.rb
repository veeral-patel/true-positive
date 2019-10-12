class CasePolicy
    def initialize(user, the_case)
        @user = user
        @case = the_case
    end

    def create?
        # Anyone can create a case.
        true
    end

    def show?
        # Only a case's members, or an admin user, can view it
        @user.admin? || @case.has_member(@user)
    end

    def rename?
        show?
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