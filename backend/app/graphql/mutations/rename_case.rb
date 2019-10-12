class Mutations::RenameCase < Mutations::BaseMutation
    description "Changes the name of a case."

    argument :id, ID, required: true do
        description "The ID of the case to rename."
    end
    argument :name, String, required: true do
        description "The new case name."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(id:, name:)
        # find the case
        thecase = find_case_or_throw_execution_error(case_id: id)

        # authorize this action
        unless CasePolicy.new(context[:current_user], thecase).rename?
            raise GraphQL::ExecutionError, "Only a case's members can rename it."
        end

        # update the case in memory
        thecase.name = name

        # and save it
        if thecase.save
            {
                "case": thecase
            }
        else
            raise GraphQL::ExecutionError, thecase.errors.full_messages.join(" | ")
        end
    end
end