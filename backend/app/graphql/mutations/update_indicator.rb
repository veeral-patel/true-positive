class Mutations::UpdateIndicator < Mutations::BaseMutation
    description "Updates an indicator."

    argument :id, ID, required: true do
        description "ID of the indicator to update."
    end

    argument :name, String, required: false do
        description "New name for this indicator."
    end

    field :indicator, Types::IndicatorType, null: true do
        description "The updated indicator."
    end

    def resolve(id:, name: nil)
        # find the indicator
        indicator = find_indicator_or_throw_execution_error(indicator_id: id)

        # TODO: authorize this operation

        # update the indicator in memory
        indicator.name = name if not name.nil?

        # save the indicator
        if indicator.save
            {
                "indicator": indicator
            }
        else
            raise GraphQL::ExecutionError, indicator.errors.full_messages.join(" | ")
        end
    end
end