class Mutations::DeleteForm < Mutations::BaseMutation
    description "Delete a pre-defined form."

    argument :id, ID, required: true do
        description "ID of the form to delete."    
    end

    field :id, ID, null: true do
        description "ID of the form that was deleted."
    end

    def resolve(id:)
        # find the form to destroy
        form = find_form_or_throw_execution_error(id: id)

        # authorize this action
        unless FormPolicy.new(context[:current_user], form).delete?
            raise GraphQL::ExecutionError, "You are not authorized to delete this form."
        end

        # destroy the form
        if form.destroy
            {
                "id": id
            }
        else
            raise GraphQL::ExecutionError, form.errors.full_messages.join(" | ")
        end
    end
end