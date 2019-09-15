class Types::HasStatusEnum < Types::BaseEnum
    description "Lists the types of objects that have a status."

    value "CASE" do
        description "A case."
    end

    value "TASK" do
        description "A task."
    end
end
