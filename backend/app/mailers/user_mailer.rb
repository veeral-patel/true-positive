class UserMailer < ApplicationMailer
    default from: 'notifications@truepositive.app'

    def invited_user
        @user, @password, @login_url = params[:user], params[:password], params[:login_url]
        mail(to: @user.email, subject: "You've been invited to True Positive")
    end
end
