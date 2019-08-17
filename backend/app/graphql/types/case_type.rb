module Types
    class CaseType < Types::BaseObject
        description "Represents an investigation."

        # required
        field :id, ID, null: false
        field :name, String, null: false
        field :created_at, String, null: false
        field :created_by, Types::UserType, null: false
        field :status, Types::StatusType, null: false
        field :priority, Types::PriorityType, null: false

        # optional
        field :description, String, null: true
        field :assigned_to, Types::UserType, null: true
        field :tags, [String], null: false
        field :tasks, [Types::TaskType], null: false

        def created_at
            # use our `formatted_created_at` method in our case model
            object.formatted_created_at
        end
    end
end
