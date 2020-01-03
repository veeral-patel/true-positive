class GroupPolicy
    def initialize(user, group)
        @user = user
        @group = group
    end

    def create_group?
        # Any user can create a group (at the moment)
        true
    end

    def update_group?
        # Any user can create any group (at the moment)
        true
    end

    def delete_group?
        # Any user can delete a group (at the moment)
        true
    end
end