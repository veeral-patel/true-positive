require_relative '../helpers'

class Mutations::CreateCase < Mutations::BaseMutation
    description "Creates a new case."

    argument :name, String, required: true do
        description "The name of the new case."
    end

    argument :created_by_id, ID, required: true do
        description "The ID (not the username) of the user who created this case."
    end

    argument :status_id, ID, required: true do
        description "The ID of this case's status."
    end

    argument :priority_id, ID, required: true do
        description "The ID of this case's priority."
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

    def resolve(name:, created_by_id:, status_id:, priority_id:, description: nil, assigned_to_id: nil, tags: nil)
        status = find_status_or_throw_execution_error(status_id: status_id)
        priority = find_priority_or_throw_execution_error(priority_id: priority_id)
        created_by = find_user_or_throw_execution_error(user_id: created_by_id)
        assigned_to = assigned_to_id.nil? ? nil : find_user_or_throw_execution_error(user_id: assigned_to_id)

        new_case = Case.new(
            name: name,
            created_by: created_by,
            status: status,
            priority: priority,
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