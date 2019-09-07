class Mutations::MergeCase < Mutations::BaseMutation
    # id of the case we are merging
    argument :child_case_id, ID, required: true

    # id of the case we're merging it into
    argument :parent_case_id, ID, required: true

    # the case we just merged
    field :child_case, Types::CaseType, null: false

    # the case we merged it into
    field :parent_case, Types::CaseType, null: false

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