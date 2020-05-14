module Types
    class TagType < Types::BaseObject
        description "A short string you can apply to cases and indicators for easier search."

        field :name, String, null: false do
            description "The tag (such as 'phishing')."
        end
    end
end
