class Mutations::AssignCase < Mutations::BaseMutation
    description "Assign a case to an user."

    argument :case_id, ID, required: true do
        description "The ID of the case to assign."
    end

    argument :user_id, ID, required: true do
        description "The ID of the user to assign to the case."
    end

    field :case, Types::CaseType, null: true do
        description "The updated case."
    end

    def resolve(case_id:, user_id:)
        # find the case and user
        the_case = find_case_or_throw_execution_error(case_id: case_id)
        user = find_user_or_throw_execution_error(user_id: user_id)

        # assign the case
        the_case.assigned_to = user

        # and save it
        if the_case.save
            {
                "case": the_case
            }
        else
            raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
        end
    end
end