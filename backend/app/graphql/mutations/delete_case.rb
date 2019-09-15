class Mutations::DeleteCase < Mutations::BaseMutation
    description "Deletes a case, its tasks, its indicators, and any cases merged into it."

    argument :id, ID, required: true

    # ID of the deleted case
    field :id, ID, null: false

    def resolve(id:)
        theCase = find_case_or_throw_execution_error(case_id: id)

        if theCase.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, theCase.errors.full_messages.join(" | ")
        end
    end
end