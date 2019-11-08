module Types
    class StatusType < Types::BaseObject
        description "A state a case can be in."

        field :name, String, null: false do
            description "This status's name (such as 'Open')."
        end

        field :description, String, null: true do
            description "Some optional text describing this status."
        end
    end
end
