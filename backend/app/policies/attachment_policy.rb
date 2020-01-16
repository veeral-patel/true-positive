class AttachmentPolicy
    def initialize(user, attachment)
        @user = user
        @attachment = attachment
    end

    def delete?
        if @attachment.attachable_type === "Case"
            CasePolicy.new(@user, @comment.commentable).update_case?
        end
        false
    end
end