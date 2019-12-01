class ApiTokenPolicy
    def initialize(user, api_token)
        @user = user
        @api_token = api_token
    end

    def create_token?
        # Any user can create an API token
        true
    end

    def delete_token?
        # A user can only delete a token that they created.
        @user.api_tokens.include? @api_token
    end

    class Scope
        attr_reader :user

        def initialize(user)
            @user  = user
        end

        def resolve
            user.api_tokens
        end
    end
end