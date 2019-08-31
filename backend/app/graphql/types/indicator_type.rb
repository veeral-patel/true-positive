module Types
    class IndicatorType < Types::BaseObject
        description "A file hash, IP address, domain name, or another indicator of compromise."

        field :id, ID, null: false
        field :name, String, null: false
        field :description, String, null: true
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :created_by, Types::UserType, null: false
        field :comments, [Types::CommentType], null: false
    end
end