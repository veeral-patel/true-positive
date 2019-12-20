class Types::AuditType < Types::BaseObject
    description "An entry recording a change to a case, task, indicator, or other object."

    # never null
    field :id, ID, null: false do
        description "A unique integer identifying this audit entry."
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
        description "When the change occurred."
    end

    field :created_by, Types::UserType, null: false do
        description "The user who made the change."  
    end
end