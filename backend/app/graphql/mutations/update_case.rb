class Mutations::UpdateCase < Mutations::BaseMutation
    description "Update a case."

    argument :case_id, ID, required: true do
        description "The ID of the case to update"
    end

    argument :reason_for_merging, String, required: false do
        description "The reason this case was merged into another case (if it was.)"
    end

    field :case, Types::CaseType, null: true do
        description "The updated case"
    end

    def resolve(case_id:, reason_for_merging:)
        # find the case
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).update_case?
            raise GraphQL::ExecutionError, "You are not authorized to update this case."
        end

        # update the case in memory
        the_case.reason_for_merging = reason_for_merging if not reason_for_merging.nil?

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