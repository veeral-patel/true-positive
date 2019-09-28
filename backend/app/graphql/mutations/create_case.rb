require_relative '../helpers'

class Mutations::CreateCase < Mutations::BaseMutation
    description "Creates a new case."

    argument :name, String, required: true do
        description "The name of the new case."
    end

    argument :status, String, required: true do
        description "The new case's status's name."
    end

    argument :priority, String, required: true do
        description "The new case's priority's name."
    end

    argument :description, String, required: false do
        description "Optional text describing this case."
    end

    argument :assigned_to_id, ID, required: false do
        description "The ID of the user who this case is assigned to. Optional."
    end

    argument :tags, [String], required: false do
        description "A optional list of tags to add to this case."
    end

    field :case, Types::CaseType, null: false do
        description "The newly created case."
    end

    def resolve(name:, status:, priority:, description: nil, assigned_to_id: nil, tags: nil)
        status_record = find_status_by_name_or_throw_execution_error(status_name: status)
        priority_record = find_priority_by_name_or_throw_execution_error(priority_name: priority)
        assigned_to = assigned_to_id.nil? ? nil : find_user_or_throw_execution_error(user_id: assigned_to_id)

        new_case = Case.new(
            name: name,
            created_by: context[:current_user],
            status: status_record,
            priority: priority_record,
            description: description,
            assigned_to: assigned_to,
            tag_list: tags
        )

        if new_case.save
            {
                "case": new_case
            }
        else
            raise GraphQL::ExecutionError, new_case.errors.full_messages.join(" | ") 
        end
    end
end