class ApiTokenPolicy
    def initialize(user, api_token)
        @user = user
        @api_token = api_token
    end

    def delete_token?
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