class CasePolicy
    class Scope
        attr_reader :user, :scope

        def initialize(user, scope)
            @user  = user
            @scope = scope
        end

        def resolve
            # Todo: admins can see all cases.

            # an user can see the cases he's a member of.
            @user.joined_cases
        end
    end
end