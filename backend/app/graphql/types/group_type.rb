class Types::GroupType < Types::BaseObject
    description "Represents a group of users."

    # never null ---

    field :id, ID, null: false do
        description "A unique integer identifying this group."
    end

    field :name, String, null: false do
        description "The group's name."    
    end

    field :users, [Types::UserType], null: false do
        description "The users in this group."
    end

    field :user_count, Int, null: false do
        description "The number of users in this group."
    end
end