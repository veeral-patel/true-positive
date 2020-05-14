class Types::FormType < Types::BaseObject
    description "Represents a pre-defined form that can be added to a case."

    # never null
    field :id, ID, null: false do
        description "A unique integer identifying this form."
    end

    field :name, String, null: false do
        description "This form's name."
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
        description "When this form was created (in ISO8601 format)."
    end

    field :created_by, Types::UserType, null: false do
        description "The form who created this task."
    end

    field :form_schema, GraphQL::Types::JSON, null: false do
        description "JSON describing this form's structure."
    end

    field :ui_schema, GraphQL::Types::JSON, null: false do
        description "JSON describing this form's appearance."
    end
end