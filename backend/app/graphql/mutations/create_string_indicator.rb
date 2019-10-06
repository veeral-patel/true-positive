class Mutations::CreateStringIndicator < Mutations::BaseMutation
    description "Adds a new string-based indicator to a case. Examples of string-based indicators include domains, IPs, and file hashes."
    
    # required ------

    argument :indicator, String, required: true do
        description "The indicator itself."
    end

    argument :case_id, ID, required: true do
        description "The ID of the case to add this task to."
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
end