class Mutations::AddGroupToCase < Mutations::BaseMutation
    description "Add all the members of a group to a case."

    argument :group_id, ID, required: true do
        description "ID of the group whose members we're adding."
    end

    argument :case_id, ID, required: true do
        description "ID of the case to add members to."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(group_id:, case_id:)
        # find the group and case
        group = find_group_or_throw_execution_error(id: group_id)
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).update_case?
            raise GraphQL::ExecutionError, "You are not authorized to update this case."
        end

        # add each of the group's users to the case
        group.users.each do |user|
            # skip users who are already in the case
            if not the_case.has_member(user)
                the_case.case_members.create(user: user, role: "CAN_EDIT")
            end
        end

        {
            "case": the_case
        }
    end
end