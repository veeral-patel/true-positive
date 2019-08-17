module Types
  class MutationType < Types::BaseObject
      description "Mutations are used for creating, updating, or deleting data."

      field :create_status, mutation: Mutations::CreateStatus
      field :create_priority, mutation: Mutations::CreatePriority
      field :create_case, mutation: Mutations::CreateCase
  end
end
