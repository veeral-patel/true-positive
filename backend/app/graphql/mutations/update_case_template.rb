class Mutations::UpdateCaseTemplate < Mutations::BaseMutation
    description "Update a case template."

    # required ---

    argument :id, ID, required: true do
        description "ID of the case template to update."
    end

    # not required ---

    argument :name, String, required: false do
        description "New name."
    end

    argument :status, String, required: false do
        description "Name of this case template's new status."
    end

    argument :priority, String, required: false do
        description "Name of this case template's new priority."
    end

    argument :assigned_to, String, required: false do
        description "Username of the user to assign to cases created from this template, or 'N/A' if not applicable."
    end

    argument :description, String, required: false do
        description "New description."
    end

    argument :tags, [String], required: false do
        description "This case template's updated tags."
    end

    # output ---

    field :case_template, Types::CaseTemplateType, null: true do
        description "The updated case template."
    end

    def resolve(id:, name: nil, status: nil, priority: nil, assigned_to: nil, description: nil, tags: nil)
        # find the case template in memory
        case_template = find_case_template_or_throw_execution_error(id: id)

        # update it in memory
        case_template.name = name if not name.nil?
        case_template.status = find_status_by_name_or_throw_execution_error(status_name: status) if not status.nil?
        case_template.priority = find_priority_by_name_or_throw_execution_error(priority_name: priority) if not priority.nil?
        case_template.description = description if not description.nil?
        case_template.tag_list = tags if not tags.nil?

        unless assigned_to.nil?
            if assigned_to === "N/A"
                case_template.assigned_to = nil
            else
                case_template.assigned_to = find_user_or_throw_execution_error(username: assigned_to)
            end
        end

        # authorize this action
        unless CaseTemplatePolicy.new(context[:current_user], case_template).update_template?
            raise GraphQL::ExecutionError, "You are not authorized to update this template."
        end

        # save the updated template
        if case_template.save
            {
                "case_template": case_template
            }
        else
            raise GraphQL::ExecutionError, case_template.errors.full_messages.join(" | ")
        end
    end
end