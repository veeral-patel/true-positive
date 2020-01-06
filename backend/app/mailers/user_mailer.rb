class UserMailer < ApplicationMailer
    default from: 'notifications@truepositive.app'

    def invited_user
        @user, @password, @tp_url = params[:user], params[:password], params[:tp_url]
        @change_password_url = "#{@tp_url}/profile"
        mail(to: @user.email, subject: "You've been invited to True Positive")
    end
end
