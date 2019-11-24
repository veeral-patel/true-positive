class Types::TaskTemplateType < Types::BaseObject
    description "A template you can initialize new tasks from."

    # never null ---
    field :id, ID, null: false do
        description "An unique integer describing this task template."
    end

    field :name, String, null: false do
        description "Default name for tasks created with this template."
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
        description "When this template was created (in ISO8601 format)."
    end

    field :created_by, Types::UserType, null: false do
        description "The user who created this template."
    end

    # possibly null ---
    field :description, String, null: true do
        description "Default description for tasks created with this template."
    end

    field :assigned_to, Types::UserType, null: true do
        description "Default user to assign to tasks created with this template (if any)."
    end
end