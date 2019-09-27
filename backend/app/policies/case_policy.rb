class CasePolicy
    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            # Todo: admins can see all cases. Try policy namespacing.

            # an user can see the cases he's a member of.
            @user.joined_cases
        end
    end
end