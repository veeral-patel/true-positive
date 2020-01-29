class Mutations::ChangeRoleInCaseTemplate < Mutations::BaseMutation
    description "Change the role of a user or a group in a case template."

    # required ---

    argument :case_id, ID, required: true do
        description "ID of the case template to update."
    end

    argument :role, Types::CaseRoleEnum, required: true do
        description "The new role for the user or group."
    end

    # not required ---

    # one of the two arguments below is required
    argument :username, String, required: false do
        description "The username of the user whose role we're changing."
    end

    argument :group_id, ID, required: false do
        description "ID of the group whose role we're changing."
    end

    # output ---

    field :case_template, Types::CaseTemplateType, null: true do
        description "The updated case template."
    end

    def resolve(case_id:, role:, username: nil, group_id:)
    end
end