class Mutations::ChangeStatus < Mutations::BaseMutation
    description "Change the status of a case."

    argument :case_id, ID, required: true do
        description "The ID of the case whose status we're updating."
    end

    argument :status, ID, required: true do
        description "The name of the new status (eg, Open)"
    end

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(case_id:, status:)
        # find the new status
        new_status =  find_status_by_name_or_throw_execution_error(status_name: status)

        # find the case
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).change_status?
            raise GraphQL::ExecutionError, "You are not authorized to change the status of this case."
        end

        # update the case in memory
        the_case.status = new_status

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