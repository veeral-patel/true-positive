require 'rails_helper'

module Mutations
    RSpec.describe CreatePriority, type: :request do
        let(:name) { ["P0", "P1", "P2"].sample }
        let(:description) { ["D1", "D2", "D3"].sample }

        it 'creates a priority' do
            expect do
                create_priority(name, description)
            end.to change { Priority.count }.by(1)
        end

        let(:response) { create_priority(name, description) }

        it 'produces the correct response' do
            expect(response.to_h).to eq({
                "data" => {
                    "createPriority" => {
                        "priority" => {
                            "name" => name,
                            "description" => description,
                        }
                    }
                }
            })
        end

        let(:duplicated_name) { "P_DUP" }

        it "provides an error message when trying to insert a duplicate priority" do
            create_priority(duplicated_name, description)
            response = create_priority(duplicated_name, description)

            # no data should be provided
            expect(response.to_h["data"]).to eq({"createPriority" => nil})

            # only one error object should be provided
            expect(response.to_h["errors"].count).to eq(1)

            # and its error message should be 'Name has already been taken'
            error_message = response.to_h["errors"].first["message"]
            expect(error_message).to eq("Name has already been taken")
        end

        def create_priority(name, description)
            mutation = <<~GQL
                mutation createPriority($input: CreatePriorityInput!){
                    createPriority(input: $input) {
                        priority {
                            name
                            description
                        }
                    }
                }
            GQL

            V1Schema.execute(mutation, variables: {
                input: {
                    name: name,
                    description: description
                }
            })
        end
    end
end