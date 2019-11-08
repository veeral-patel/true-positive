module Types
    class TagType < Types::BaseObject
        description "An existing tag on a case or indicator."

        field :name, String, null: false do
            description "The tag (such as 'phishing')."
        end
    end
end
