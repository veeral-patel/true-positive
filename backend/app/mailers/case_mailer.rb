class CaseMailer < ApplicationMailer
    default from: 'notifications@truepositive.app'

    def added_member
        @user = params[:user]
        mail(to: @user.email, subject: "You've been added to a case")
    end
end
