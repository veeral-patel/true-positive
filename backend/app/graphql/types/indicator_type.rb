module Types
    class IndicatorType < Types::BaseObject
        description "A string-based, file-based, or text-based indicator in a case."

        field :id, ID, null: false do
            description "An unique integer identifying this indicator."
        end

        field :name, String, null: false do
            description "A brief name for this indicator."
        end

        field :indicator, String, null: true do
            description "The indicator itself."
        end

        field :type, Types::IndicatorTypeEnum, null: false, method: :indicator_type do
            description "What kind of indicator this is."
        end

        field :description, String, null: true do
            description "A description for this indicator."
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

        field :case, Types::CaseType, null: false do
            description "The case this indicator belongs to."
        end
    end
end