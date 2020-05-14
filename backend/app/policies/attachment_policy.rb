class AttachmentPolicy
    def initialize(user, attachment)
        @user = user
        @attachment = attachment
    end

    def delete?
        if @attachment.attachable_type == "Case"
            CasePolicy.new(@user, @attachment.attachable).update_case?
        elsif @attachment.attachable_type == "Task"
            TaskPolicy.new(@user, @attachment.attachable).update_task?
        elsif @attachment.attachable_type == "Indicator"
            IndicatorPolicy.new(@user, @attachment.attachable).update_indicator?
        else
            false
        end
    end
end