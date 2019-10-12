class CommentPolicy
    def initialize(user, comment)
        @user = user
        @comment = comment
    end

    def destroy?
        # Only a comment's creator can delete it
        @comment.created_by == @user
    end
end