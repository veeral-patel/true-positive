class Mutations::CreateCaseTemplate < Mutations::BaseMutation
    description "Creates a new case template."

    # required ---

    argument :name, String, required: true do
        description "Default name for cases created from this template."
    end

    argument :status, String, required: true do
        description "Default status for cases created from this template."
    end

    argument :priority, String, required: true do
        description "Default priority for cases created from this template."
    end

    # not required ---

    argument :description, String, required: false do
        description "Default description for cases created from this template."
    end

    argument :tags, [String], required: false do
        description "Default tags for cases created from this template."
    end

    field :case_template, Types::CaseTemplateType, null: false do
        description "Newly created case template."
    end

    def resolve(name:, status:, priority:, description: nil, tags: nil)
        # find the status and priority
        status_record = find_status_by_name_or_throw_execution_error(status_name: status)
        priority_record = find_priority_by_name_or_throw_execution_error(priority_name: priority)

        # create a case template in memory
        case_template = CaseTemplate.new(
            name: name,
            created_by: context[:current_user],
            status: status_record,
            priority: priority_record,
            description: description,
            tag_list: tags
        )

        # authorize this action
        unless CaseTemplatePolicy.new(context[:current_user], case_template).create_template?
            raise GraphQL::ExecutionError, "You are not authorized to create case templates."
        end

        # save it to the database
        if case_template.save
            {
                "case_template": case_template
            }
        else
            raise GraphQL::ExecutionError, case_template.errors.full_messages.join(" | ") 
        end
    end
end