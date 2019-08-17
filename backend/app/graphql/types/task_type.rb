module Types
    class TaskType < Types::BaseObject
        description "Represents an investigation."

        # required fields
        field :id, ID, null: false
        field :name, String, null: false
        field :created_by, Types::UserType, null: false
        field :status, Types::StatusType, null: false
        field :priority, Types::PriorityType, null: false
        field :case, Types::CaseType, null: false

        # optional fieldsj
        field :description, String, null: true
        field :assigned_to, Types::UserType, null: true
        field :tags, [String], null: false
    end
end