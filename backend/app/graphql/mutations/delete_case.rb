class Mutations::DeleteCase < Mutations::BaseMutation
    description "Deletes a case, its tasks, its indicators, and any cases merged into it."

    argument :id, ID, required: true do
        description "The ID of the case to delete."
    end

    field :id, ID, null: true do
        description "The ID of the case that was just deleted."
    end

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