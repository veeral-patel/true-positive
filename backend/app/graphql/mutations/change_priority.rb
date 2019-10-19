class Mutations::ChangePriority < Mutations::BaseMutation
    description "Update the priority of a case."

    argument :case_id, ID, required: true do
        description "The ID of the case whose priority we're updating."
    end

    argument :priority, String, required: true do
        description "The name of the new priority (eg, Critical)."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(case_id:, priority:)
        # find the new priority
        new_priority =  find_priority_by_name_or_throw_execution_error(priority_name: priority)

        # find the case
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).change_priority?
            raise GraphQL::ExecutionError, "You are not authorized to change the priority of this case."
        end

        # update the case in memory
        the_case.priority = new_priority

        # save it
        if the_case.save
            {
                "case": the_case
            }
        else
            raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
        end
    end
end