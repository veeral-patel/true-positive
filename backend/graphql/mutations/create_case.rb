module Mutations
  class CreateCase < BaseMutation
    argument :name, String, required: true
    argument :status_id, ID, required: true
    argument :priority_id, ID, required: true
    argument :created_by_id, ID, required: true
    argument :assigned_to_id, ID, required: false
    argument :description, String, required: false

    field :case, Types::CaseType, null: true
    field :errors, [String], null: false

    def resolve(name:, status_id:, priority_id:, created_by_id:, assigned_to_id: nil, description: nil)
      new_case = Case.new(
        name: name,
        status_id: status_id,
        priority_id: priority_id,
        created_by_id: created_by_id,
        assigned_to_id: assigned_to_id,
        description: description
      )

      if new_case.save
        { case: new_case, errors: [] }
      else
        { case: nil, errors: new_case.errors.full_messages }
      end
    end
  end
end
