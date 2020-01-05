class Mutations::RemoveUserFromCaseTemplate < Mutations::BaseMutation
    description "Remove an user from a case template."

    argument :username, String, required: true do
        description "Username of the user to remove."
    end

    argument :case_template_id, ID, required: true do
        description "ID of the case template to add this user to."
    end
end