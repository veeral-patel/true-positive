class Types::CaseTemplateType < Types::BaseObject
    description "A template you can initialize new cases from."

    # never null ---
    field :id, ID, null: false do
        description "An unique integer identifying this case template."
    end

    field :name, String, null: false do
        description "Default name for cases created with this template."
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
        description "When this template was created (in ISO8601 format)."
    end

    field :created_by, Types::UserType, null: false do
        description "The user who created this template."
    end

    field :status, Types::StatusType, null: false do
        description "Default status for cases created with this template."
    end

    field :priority, Types::PriorityType, null: false do
        description "Default priority for cases created with this template."
    end

    field :tags, [Types::TagType], null: false do
        description "Default tags to add to cases created with this template."
    end

    # possibly null ---
    field :description, String, null: true do
        description "Default description for cases created with this template."
    end
end