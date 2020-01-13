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
        email_address_of_sender, @case = params[:email_address_of_sender], params[:case]
        mail(to: email_address_of_sender, subject: "Successfully created case from email")
    end
end
