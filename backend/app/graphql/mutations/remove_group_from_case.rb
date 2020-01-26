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
        # find the group and case
        group = find_group_or_throw_execution_error(id: group_id)
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).update_case?
            raise GraphQL::ExecutionError, "You are not authorized to update this case."
        end

        # raise error if the group is not in the case
        if not the_case.case_groups.map { |case_group| case_group.group }.include? group
            raise GraphQL::ExecutionError, "This case doesn't have group #{group.name}."
        end 

        # remove the group from the case
        group_to_destroy = the_case.case_groups.find_by(group: group)

        if group_to_destroy.destroy
            { "case": the_case }
        else
            raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ") 
        end
    end
end