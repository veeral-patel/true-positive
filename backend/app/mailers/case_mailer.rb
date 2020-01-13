class CaseMailer < ApplicationMailer
    default from: 'notifications@truepositive.app'

    def added_member
        @user = params[:user]
        mail(to: @user.email, subject: "You've been added to a case")
    end

    def removed_member
        @user = params[:user]
        mail(to: @user.email, subject: "You've been removed from a case")
    end

    def created_case_from_email
        @user = params[:user]
        @case = params[:case]
        mail(to: @user.email, subject: "Successfully created case from email")
    end
end
