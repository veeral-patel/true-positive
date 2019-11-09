class Mutations::ChangeIndicator < Mutations::BaseMutation
    description "Update the indicator value associated with an indicator."

    argument :id, ID, required: true do
        description "The ID of the indicator to update."
    end

    argument :indicator, String, required: true do
        description "THe new indicator value."
    end

    field :indicator, Types::IndicatorType, null: true do
        description "The updated indicator."
    end

    def resolve(id:, indicator:)
        # find and update the indicator
        indicator_record = find_indicator_or_throw_execution_error(indicator_id: id)
        indicator_record.indicator = indicator

        # authorize this action
        unless IndicatorPolicy.new(context[:current_user], indicator_record).change_indicator?
            raise GraphQL::ExecutionError, "You are not authorized to update indicators in this case."
        end

        # and save it
        if indicator_record.save
            {
                "indicator": indicator_record
            }
        else
            raise GraphQL::ExecutionError, indicator_record.errors.full_messages.join(" | ")
        end
    end
end