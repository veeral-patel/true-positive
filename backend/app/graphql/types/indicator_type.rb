module Types
    class IndicatorType < Types::BaseObject
        description "A file hash, IP address, domain name, or another indicator of compromise."

        field :id, ID, null: false do
            description "An unique integer identifying this indicator."
        end

        field :name, String, null: false do
            description "The file hash, IP address, domain name, etc. this indicator describes."
        end

        field :description, String, null: true do
            description "This indicator's description."
        end

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
            description "When this indicator was created (in ISO8601 format)."
        end

        field :created_by, Types::UserType, null: false do
            description "The user who created this indicator."
        end

        field :comments, [Types::CommentType], null: false do
            description "The comments on this indicator."
        end

        field :tags, [Types::TagType], null: false do
            description "This indicator's tags."
        end
    end
end