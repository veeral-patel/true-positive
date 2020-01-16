class AttachmentPolicy
    def initialize(user, attachment)
        @user = user
        @attachment = attachment
    end

    def delete?
        if @attachment.attachable_type == "Case"
            CasePolicy.new(@user, @attachment.attachable).update_case?
        else
            false
        end
    end
end