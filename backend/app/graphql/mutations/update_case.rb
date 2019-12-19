class Mutations::UpdateCase < Mutations::BaseMutation
    description "Update a case."

    argument :case_id, ID, required: true do
        description "The ID of the case to update"
    end

    argument :name, String, required: false do
        description "New name for this case."
    end

    argument :status, String, required: false do
        description "Name of the new status for this case."
    end

    argument :priority, String, required: false do
        description "Name of the new priority for this case."
    end

    argument :reason_for_merging, String, required: false do
        description "The reason this case was merged into another case (if it was.)"
    end

    field :case, Types::CaseType, null: true do
        description "The updated case"
    end

    def resolve(case_id:, name: nil, status: nil, priority: nil, reason_for_merging: nil)
        # find the case
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).update_case?
            raise GraphQL::ExecutionError, "You are not authorized to update this case."
        end

        # update the case in memory
        the_case.name = name if not name.nil?
        the_case.reason_for_merging = reason_for_merging if not reason_for_merging.nil?
        the_case.status = find_status_by_name_or_throw_execution_error(status_name: status) if not status.nil?
        the_case.priority = find_priority_by_name_or_throw_execution_error(priority_name: priority) if not priority.nil?

        # save the case
        if the_case.save
            {
                "case": the_case
            }
        else
            raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
        end
    end
end