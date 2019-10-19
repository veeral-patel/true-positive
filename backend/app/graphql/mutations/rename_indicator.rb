class Mutations::RenameIndicator < Mutations::BaseMutation
    description "Changes the name of a indicator."

    argument :id, ID, required: true do
        description "The ID of the indicator to rename."
    end

    argument :name, String, required: true do
        description "The new indicator name."
    end

    field :indicator, Types::IndicatorType, null: true do
        description "The updated indicator."
    end

    def resolve(id:, name:)
        # find and update the indicator
        indicator = find_indicator_or_throw_execution_error(indicator_id: id)
        indicator.name = name

        # authorize this action
        unless IndicatorPolicy.new(context[:current_user], indicator).rename_indicator?
            raise GraphQL::ExecutionError, "You are not authorized to rename indicators in this case."
        end

        # and save it
        if indicator.save
            {
                "indicator": indicator
            }
        else
            raise GraphQL::ExecutionError, indicator.errors.full_messages.join(" | ")
        end
    end
end