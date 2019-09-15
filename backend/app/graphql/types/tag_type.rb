module Types
    class TagType < Types::BaseObject
        description "An existing tag on a case, task, or indicator."

        field :id, ID, null: false do
            description "An unique integer identifying this tag."
        end

        field :name, String, null: false do
            description "The tag (such as 'phishing')."
        end
    end
end
