class FormPolicy
    def initialize(user, form)
        @user = user
        @form = form
    end

    def delete?
        # Any user can delete a form
        true
    end
end
