class Mutations::RemoveGroupFromCaseTemplate < Mutations::BaseMutation
    description "Removes a group from a case template."

    argument :group_id, ID, required: true do
        description "ID of the group to remove."
    end

    argument :case_template_id, ID, required: true do
        description "ID of the case template to remove this group from."
    end

    field :case_template, Types::CaseTemplateType, null: true do
        description "The updated case template."
    end

    def resolve(group_id:, case_template_id:)
        # find the group and case template
        group = find_group_or_throw_execution_error(id: group_id)
        case_template = find_case_template_or_throw_execution_error(id: case_template_id)

        # authorize this action
        unless CaseTemplatePolicy.new(context[:current_user], case_template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this template."
        end

        # ensure the CT already has the group
        if not case_template.default_groups.map { |cgroup| cgroup.group }.include? group
            raise GraphQL::ExecutionError, "Group #{group.name} is not in this case template."
        end

        # remove the group from the CT
        group_to_destroy = case_template.default_groups.find_by(group: group)

        if group_to_destroy.destroy
            { "case_template": case_template }
        else
            raise GraphQL::ExecutionError, case_template.errors.full_messages.join(" | ") 
        end
    end
end