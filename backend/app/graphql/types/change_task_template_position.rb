class Mutations::ChangeTaskTemplatePosition < Mutations::BaseMutation
    description "Updates the position of a task template in a case template."

    argument :id, ID, required: true do
        description "ID of the task template to move."
    end

    argument :position, Int, required: true do
        description "The new position."
    end

    field :task_template, Types::TaskTemplateType, null: true do
        description "The updated task template."
    end

    def resolve(id:, position:)
        # find the task template

        # authorize this action

        # and update its position
    end
end