class CommentPolicy
    def initialize(user, comment)
        @user = user
        @comment = comment
    end

    def view_comment?
        # Whether user @user is authorized to view comment @comment
        if @comment.commentable_type == "Case"
            CasePolicy.new(@user, @comment.commentable).view_comment?
        elsif @comment.commentable_type == "Task"
            TaskPolicy.new(@user, @comment.commentable).view_comment?
        elsif @comment.commentable_type == "Indicator"
            IndicatorPolicy.new(@user, @comment.commentable).view_comment?
        end
    end

    def create_comment?
        # Whether user @user is authorized to create comment @comment
        if @comment.commentable_type == "Case"
            CasePolicy.new(@user, @comment.commentable).create_comment?
        elsif @comment.commentable_type == "Task"
            TaskPolicy.new(@user, @comment.commentable).create_comment?
        elsif @comment.commentable_type == "Indicator"
            IndicatorPolicy.new(@user, @comment.commentable).create_comment?
        end
    end

    def change_comment?
        # To edit a comment, you must be its author...
        if not @comment.created_by == @user
            return false
        end

        # And be able to edit the case that it's in (as of now)
        if @comment.commentable_type == "Case"
            CasePolicy.new(@user, @comment.commentable).change_comment?
        elsif @comment.commentable_type == "Task"
            TaskPolicy.new(@user, @comment.commentable).change_comment?
        elsif @comment.commentable_type == "Indicator"
            IndicatorPolicy.new(@user, @comment.commentable).change_comment?
        end
    end

    def delete_comment?
        # Only a comment's creator can delete it
        @comment.created_by == @user
    end
end