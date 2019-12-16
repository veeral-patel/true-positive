class CaseTemplatePolicy
    def initialize(user, case_template)
        @user = user
        @case_template = case_template
    end

    def create_template?
        # Anyone can create a case template
        true
    end

    def update_template?
        # Anyone can update a case template
        true
    end

    def delete_template?
        # Anyone can delete a case template
        true
    end
end