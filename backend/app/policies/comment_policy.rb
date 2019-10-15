class CommentPolicy
    def initialize(user, comment)
        @user = user
        @comment = comment
    end

    def create_comment?
        if @comment.commentable_type == "Case"
            CasePolicy.new(@user, @comment.commentable).create_comment?
        elsif @comment.commentable_type == "Task"
            TaskPolicy.new(@user, @comment.commentable).create_comment?
        elsif @comment.commentable_type == "Indicator"
            IndicatorPolicy.new(@user, @comment.commentable).create_comment?
        end
    end

    def delete_comment?
        # Only a comment's creator can delete it
        @comment.created_by == @user
    end
end