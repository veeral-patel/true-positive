module UserService
    class Invite
        def self.run(email:)
            # raise GraphQL error if a user with the provided email already exists
            if User.exists?(email: email)
                raise GraphQL::ExecutionError, "A user with email address #{email} already exists."
            end

            # generate a password
            password = SecureRandom.alphanumeric(40)

            # generate a unique username for the user based on his email handle
            username = self.generate_username(email)
            while User.exists?(username: username)
                username = generate_username(email)
            end

            # create the user
            user = User.create(username: username, email: email, password: password)

            # get login URL depending on environment
            if Rails.env == "development"
                login_url = "http://localhost:3000"
            else
                login_url = "https://console.truepositive.app"
            end

            # email the user with his username and password
            UserMailer.with(user: user, password: password, login_url: login_url).invited_user.deliver_later
        end

        private
            # Generates a username for the user by concatenating his email handle with a few random characters
            def self.generate_username(email)
                email_handle, random_chars = email.split("@").first, SecureRandom.alphanumeric(4)
                "#{email_handle}-#{random_chars}"
            end
    end
end