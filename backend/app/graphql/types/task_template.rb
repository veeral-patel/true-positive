class Types::TaskTemplate < Types::BaseObject
    description "A template you can initialize new tasks from."

    # never null ---
    field :id, ID, null: false do
        description "An unique integer describing this task template."
    end

    field :name, String, null: false do
        description "Default name for tasks created with this template."
    end

    # possibly null ---
    field :description, String, null: true do
        description "Default description for tasks created with this template."
    end

    field :assigned_to, Types::UserType, null: true do
        description "The user this case was assigned to (if any)."
    end
end