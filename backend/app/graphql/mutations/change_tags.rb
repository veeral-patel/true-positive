class Mutations::ChangeTags < Mutations::BaseMutation
    description "Update the tags of a case or indicator."

    argument :object_id, ID, required: true do
        description "The ID of the case or indicator that we're updating."
    end

    argument :tags, [String], required: true do
        description "The new list of tags."
    end

    argument :type, Types::HasTagsEnum, required: true do
        description "Whether we're updating a case or indicator."
    end

    # the updated case. null if you're not updating a case.
    field :case, Types::CaseType, null: true do
        description "The updated case. Is null if you're not updating a case."
    end

    field :indicator, Types::IndicatorType, null: true do
        description "The updated indicator. Is null if you're not updating a indicator."
    end

    def resolve(object_id:, tags:, type:)
        if type == "CASE"
            # find the case
            the_case = find_case_or_throw_execution_error(case_id: object_id)

            # authorize this action
            unless CasePolicy.new(context[:current_user], the_case).change_tags?
                raise GraphQL::ExecutionError, "You are not authorized to change this case's tags."
            end

            # update the case in memory
            the_case.tag_list = tags

            # save it
            if the_case.save
                { "case": the_case }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        elsif type == "INDICATOR"
            # find the indicator
            the_indicator = find_indicator_or_throw_execution_error(indicator_id: object_id)

            # authorize this action
            unless IndicatorPolicy.new(context[:current_user], the_indicator).change_tags?
                raise GraphQL::ExecutionError, "You are not authorized to change this indicator's tags."
            end

            # update the indicator in memory
            the_indicator.tag_list = tags

            # save it
            if the_indicator.save
                { "indicator": the_indicator }
            else
                raise GraphQL::ExecutionError, the_indicator.errors.full_messages.join(" | ")
            end
        end
    end
end