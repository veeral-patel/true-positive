module Types
    class StatusType < Types::BaseObject
        description "A state a case or a task can be in."

        field :id, ID, null: false do
            description "An unique integer identifying this status."
        end

        field :name, String, null: false do
            description "This status's name (such as 'Open')."
        end

        field :description, String, null: true do
            description "Some optional text describing this status."
        end
    end
end
