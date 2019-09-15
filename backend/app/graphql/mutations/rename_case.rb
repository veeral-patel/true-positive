class Mutations::RenameCase < Mutations::BaseMutation
    description "Changes the name of a case."

    argument :id, ID, required: true
    argument :name, String, required: true # new case name

    # updated case
    field :case, Types::CaseType, null: false

    def resolve(id:, name:)
        # find and update the case
        thecase = find_case_or_throw_execution_error(case_id: id)
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