class Mutations::DeleteCase < Mutations::BaseMutation
    description "Deletes a case, its tasks, its indicators, and any cases merged into it."

    argument :id, ID, required: true do
        description "The ID of the case to delete."
    end

    field :id, ID, null: true do
        description "The ID of the case that was just deleted."
    end

    def resolve(id:)
        the_case = find_case_or_throw_execution_error(case_id: id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], the_case).delete_case?
            raise GraphQL::ExecutionError, "You are not authorized to delete this case."
        end

        if the_case.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
        end
    end
end