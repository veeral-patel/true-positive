class StatusPolicy
    def initialize(user, status)
        @user = user
        @status = status
    end

    def create_status?
        # Anyone can create a status.
        true
    end

    def delete_status?
        # Anyone can delete a status.
        true
    end
end