class Mutations::ChangeStatus < Mutations::BaseMutation
    # the ID of the case or task whose status we're changing
    argument :object_id, ID, required: true

    # the ID of the new status
    argument :status_id, ID, required: true

    # the ID of the updated case or task
    field :id, ID, null: false

    def resolve(object_id:, status_id:)
    end
end