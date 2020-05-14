class Mutations::DeleteIndicator < Mutations::BaseMutation
    description "Delete an indicator."

    argument :id, ID, required: true do
        description "The ID of the indicator to delete."
    end

    field :id, ID, null: true do
        description "The ID of the indicator that was just deleted."
    end

    def resolve(id:)
        indicator = find_indicator_or_throw_execution_error(indicator_id: id)

        # authorize this action
        unless IndicatorPolicy.new(context[:current_user], indicator).delete_indicator?
            raise GraphQL::ExecutionError, "You are not authorized to delete indicators in this case."
        end

        # delete the indicator
        if indicator.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, indicator.errors.full_messages.join(" | ")
        end
    end
end