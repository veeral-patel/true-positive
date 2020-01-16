class Types::AttachmentType < Types::BaseObject
    description "Represents a file that's been added to a case, task, indicator, or other object."

    # never null
    field :id, ID, null: false do
        description "A unique integer identifying this attachment."
    end

    field :name, String, null: false do
        description "This attachment's name."
    end

    field :url, String, null: false do
        description "The URL to access this attachment."
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
        description "When this attachment was uploaded."
    end

    field :size, Int, null: false do
        description "This attachment's file size, in bytes."
    end

    field :friendly_size, String, null: false do
        description "This attachment's file size, formatted to be human readable."
    end 
end