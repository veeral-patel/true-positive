module Types
    class IndicatorType < Types::BaseObject
        description "A file hash, IP address, domain name, or another indicator of compromise."

        field :id, ID, null: false do
            description "An unique integer identifying this indicator."
        end

        field :name, String, null: false do
        end

        field :description, String, null: true do
        end

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
        end

        field :created_by, Types::UserType, null: false do
        end

        field :comments, [Types::CommentType], null: false do
        end

        field :tags, [Types::TagType], null: false do
        end
    end
end