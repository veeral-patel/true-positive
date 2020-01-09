class Mutations::AddGroupToCaseTemplate < Mutations::BaseMutation
    description "Add a group to a case template."

    argument :group_id, ID, required: true do
        description "ID of the group to add."
    end

    argument :case_template_id, ID, required: true do
        description "ID of the case template to add this group to."
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

        # ensure the CT doesn't already have the group
        if case_template.default_groups.map { |cgroup| cgroup.group }.include? group
            raise GraphQL::ExecutionError, "Group #{group.name} is already in this case template."
        end

        # add the group to the CT
        if case_template.default_groups.create(group: group)
            { case_template: case_template }
        else
            raise GraphQL::ExecutionError, case_template.errors.full_messages.join(" | ") 
        end
    end
end