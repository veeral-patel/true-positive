class Mutations::MergeCase < Mutations::BaseMutation
    description "Merges a case into another case. Merging a case simply marks it as merged; it doesn't modify the case, its indicators, or its tasks at all."

    argument :child_case_id, ID, required: true do
        description "The ID of the case to merge."
    end

    # id of the case we're merging it into
    argument :parent_case_id, ID, required: true do
        description "The ID of the case we're merging it into."
    end

    # the case we just merged
    field :child_case, Types::CaseType, null: true do
        description "The case we just merged."
    end

    field :parent_case, Types::CaseType, null: true do
        description "The case we merged it into."
    end

    def resolve(child_case_id:, parent_case_id:)
        # find our intended child case and the parent case
        child_case = find_case_or_throw_execution_error(case_id: child_case_id)
        parent_case = find_case_or_throw_execution_error(case_id: parent_case_id)

        if child_case.merge_case_into(parent_case)
            {
                "child_case": child_case,
                "parent_case": parent_case
            }
        else
            raise GraphQL::ExecutionError, child_case.errors.full_messages.join(" | ")
        end
    end
end