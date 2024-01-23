module Types
  class CaseType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :status, Types::StatusType, null: false
    field :priority, Types::PriorityType, null: false
    field :created_by, Types::UserType, null: false
    field :assigned_to, Types::UserType, null: true
    field :description, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :code, String, null: false
  end
end
