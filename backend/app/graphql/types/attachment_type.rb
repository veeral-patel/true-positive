class Types::AttachmentType < Types::BaseObject
    description "Represents a file that's been added to a case, task, indicator, or other object."

    # never null
    field :id, ID, null: false do
        description "A unique integer identifying this attachment."
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
        description "When this attachment was uploaded."
    end
end