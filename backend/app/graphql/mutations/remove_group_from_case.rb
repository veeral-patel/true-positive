class Mutations::RemoveGroupFromCase < Mutations::BaseMutation
    description "Remove a group from a case so its members can no longer access the case."

    argument :group_id, ID, required: true do
        description "ID of the group to remove."
    end

    argument :case_id, ID, required: true do
        description "ID of the case to remove the group from."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(group_id:, case_id:)
    end
end