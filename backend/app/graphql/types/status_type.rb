module Types
    class StatusType < Types::BaseObject
        description "A state a case or a task can be in."

        field :id, ID, null: false
        field :name, String, null: false
        field :description, String, null: true
    end
end
