module Types
    class TagType < Types::BaseObject
        description "An existing tag on a case, task, or indicator."

        field :id, ID, null: false
        field :name, String, null: false
    end
end
