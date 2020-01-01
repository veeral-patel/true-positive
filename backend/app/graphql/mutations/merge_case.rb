class Mutations::MergeCase < Mutations::BaseMutation
    description "Merges a case into another."

    argument :child_case_id, ID, required: true do
        description "The ID of the case to merge."
    end

    # id of the case we're merging it into
    argument :parent_case_id, ID, required: false do
        description "The ID of the case we're merging it into. If null, then unmerges the child case."
    end

    argument :reason, String, required: false do
        description "Reason for merging the two cases."
    end

    # the case we just merged
    field :child_case, Types::CaseType, null: true do
        description "The case we just merged."
    end

    field :parent_case, Types::CaseType, null: true do
        description "The case we merged it into."
    end

    def resolve(child_case_id:, parent_case_id: nil, reason: nil)
        # find our intended child case and the parent case
        child_case = find_case_or_throw_execution_error(case_id: child_case_id)

        # find parent case if we were given its ID
        if parent_case_id.nil?
            parent_case = nil
        else
            parent_case = find_case_or_throw_execution_error(case_id: parent_case_id)
        end

        # authorize this action
        unless CasePolicy.new(context[:current_user], child_case).can_merge_into?(parent_case: parent_case)
            raise GraphQL::ExecutionError, "To merge a case into another, you must have permission to edit both cases."
        end

        # if we weren't provided a parent_case_id, then unmerge the child case
        if parent_case_id.nil? 
            if CaseService::Unmerge.run(child_case, context[:current_user])
                {
                    "child_case": child_case,
                    "parent_case": nil
                }
            else
                raise GraphQL::ExecutionError, child_case.errors.full_messages.join(" | ")
            end
        else
            # otherwise, merge the child case into the parent case
            if child_case.merge_case_into(parent_case, reason)
                {
                    "child_case": child_case,
                    "parent_case": parent_case
                }
            else
                raise GraphQL::ExecutionError, child_case.errors.full_messages.join(" | ")
            end
        end
    end
end