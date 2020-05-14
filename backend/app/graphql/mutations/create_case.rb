require_relative '../helpers'

class Mutations::CreateCase < Mutations::BaseMutation
    description "Creates a new case."

    # required ---

    argument :name, String, required: true do
        description "The name of the new case."
    end

    argument :status, String, required: true do
        description "The new case's status's name."
    end

    argument :priority, String, required: true do
        description "The new case's priority's name."
    end

    # not required ---

    argument :description, String, required: false do
        description "This case's description."
    end

    argument :assigned_to, String, required: false do
        description "The username of the user who this case is assigned to, or 'N/A'."
    end

    argument :tags, [String], required: false do
        description "Tags to add to this case."
    end

    # output ---

    field :case, Types::CaseType, null: true do
        description "The newly created case."
    end

    def resolve(name:, status:, priority:, description: nil, assigned_to: nil, tags: nil)
        status_record = find_status_by_name_or_throw_execution_error(status_name: status)
        priority_record = find_priority_by_name_or_throw_execution_error(priority_name: priority)
        assigned_user = assigned_to.nil? ? nil : find_user_or_throw_execution_error(username: assigned_to)

        new_case = Case.new(
            name: name,
            created_by: context[:current_user],
            status: status_record,
            priority: priority_record,
            description: description,
            assigned_to: assigned_user,
            tag_list: tags
        )

        # authorize this action
        unless CasePolicy.new(context[:current_user], new_case).create_case?
            raise GraphQL::ExecutionError, "You are not authorized to create cases."
        end

        # and save the case
        if new_case.save

            # tell Segment a case was created
            if Rails.env.production?
                Analytics.track(
                    user_id: context[:current_user].username,
                    event: 'Case created',
                    properties: {
                        case_id: new_case.id,
                        case_name: new_case.name,
                    }
                )
            end

            # render JSON response
            {
                "case": new_case
            }
        else
            raise GraphQL::ExecutionError, new_case.errors.full_messages.join(" | ") 
        end
    end
end