class PriorityPolicy
    def initialize(user, priority)
        @user = user
        @priority = priority
    end

    def create_priority?
        # Anyone can create a priority.
        true
    end

    def rename_priority?
        # Anyone can rename a priority.
        true
    end

    def delete_priority?
        # Anyone can delete a priority.
        true
    end
end