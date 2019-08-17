module Types
    class PriorityType < Types::BaseObject
        description "Describes the severity level of a case or task."

        field :id, ID, null: false
        field :name, String, null: false
        field :description, String, null: true
    end
end