class Mutations::CreateTextIndicator < Mutations::BaseMutation
    description "Adds a new text-based indicator to a case. Examples of text-based indicators include Snort rules and Exif metadata."

    # required ----

    argument :name, String, required: true do
        description "A brief name for this indicator."
    end
    
    argument :text, String, required: true do
        description "The indicator itself."
    end

    argument :case_id, ID, required: true do
        description "The ID of the case to add this indicator to."
    end

    # not required -----

    argument :description, String, required: false do
        description "Optional text describing this indicator."
    end

    argument :tags, [String], required: false do
        description "A optional list of tags to add to this indicator."
    end

    # output -----
    field :indicator, Types::IndicatorType, null: false do
        description "The newly created indicator."
    end

    def resolve(name:, text:, case_id:, description: nil, tags: nil)
        # find the case to create this indicator in
        the_case = find_case_or_throw_execution_error(case_id: case_id)

        # create the new indicator in memory
        new_indicator = context[:current_user].created_indicators.new(
            name: name,
            text: text,
            description: description,
            tag_list: tags,
            case: the_case,
            indicator_type: "TEXT"
        )

        # authorize this action
        unless IndicatorPolicy.new(context[:current_user], new_indicator).create_indicator?
            raise GraphQL::ExecutionError, "You are not authorized to add indicators to this case."
        end

        # and try to save it
        if new_indicator.save
            {
                "indicator": new_indicator
            }
        else
            raise GraphQL::ExecutionError, new_indicator.errors.full_messages.join(" | ") 
        end
    end
end