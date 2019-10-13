class StatusPolicy
    def initialize(user, status)
        @user = user
        @status = status
    end

    def create?
        # Anyone can create a status.
        true
    end
end