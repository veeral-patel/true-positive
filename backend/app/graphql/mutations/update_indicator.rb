class Mutations::UpdateIndicator < Mutations::BaseMutation
    description "Updates an indicator."

    argument :id, ID, required: true do
        description "ID of the indicator to update."
    end

    argument :name, String, required: false do
        description "New name for this indicator."
    end

    argument :description, String, required: false do
        description "New description for this indicator."
    end

    argument :indicator, String, required: false do
        description "New indicator value associated with this indicator."
    end

    field :indicator, Types::IndicatorType, null: true do
        description "The updated indicator."
    end

    def resolve(id:, name: nil, description: nil, indicator: nil)
        # find the indicator
        the_indicator = find_indicator_or_throw_execution_error(indicator_id: id)

        # authorize this action
        unless IndicatorPolicy.new(context[:current_user], the_indicator).update_indicator?
            raise GraphQL::ExecutionError, "You are not authorized to update this indicator."
        end

        # update the indicator in memory
        the_indicator.name = name if not name.nil?
        the_indicator.description = description if not description.nil?
        the_indicator.indicator = indicator if not indicator.nil?

        # save the indicator
        if the_indicator.save
            {
                "indicator": the_indicator
            }
        else
            raise GraphQL::ExecutionError, the_indicator.errors.full_messages.join(" | ")
        end
    end
end