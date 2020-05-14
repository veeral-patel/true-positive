module Types
    class PriorityType < Types::BaseObject
        description "A severity level a case can have."

        field :name, String, null: false do
            description "This priority's name (such as 'Critical')."
        end

        # field :description, String, null: true do
        #     description "Some optional text describing this priority."
        # end
    end
end