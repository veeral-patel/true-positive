class Mutations::ChangeStatus < Mutations::BaseMutation
    # the ID of the case or task whose status we're changing
    argument :object_id, ID, required: true

    # the ID of the new status
    argument :status_id, ID, required: true

    # type of the object we're updating (either case or task)
    argument :type, Types::HasStatusEnum, required: true

    # the ID of the updated case or task
    field :id, ID, null: false

    def resolve(object_id:, status_id:, type:)
        new_status =  find_status_or_throw_execution_error(status_id: status_id)
        if type === "CASE"
            the_case = find_case_or_throw_execution_error(case_id: object_id)
            the_case.status = new_status

            if the_case.save
                {
                    "id": object_id
                }
            else
                raise GraphQL::ExecutionError, the_case.errors.full_messages.join(" | ")
            end
        end
    end
end