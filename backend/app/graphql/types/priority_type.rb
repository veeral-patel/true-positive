module Types
    class PriorityType < Types::BaseObject
        description "Describes the severity level of a case or task."

        field :id, ID, null: false do
            description "An unique integer identifying this priority."
        end

        field :name, String, null: false do
            description "This priority's name (such as 'Critical')."
        end

        field :description, String, null: true do
            description "Some optional text describing this priority."
        end
    end
end