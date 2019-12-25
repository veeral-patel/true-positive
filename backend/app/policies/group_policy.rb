class GroupPolicy
    def initialize(user, group)
        @user = user
        @group = group
    end

    def create_group?
        # Any user can create a group (at the moment)
        true
    end
end