require 'rails_helper'

module Mutations
    RSpec.describe CreateStatus, type: :request do
        let(:name) { ["S0", "S1", "S2"].sample }
        let(:description) { ["D1", "D2", "D3"].sample }

        it 'creates a status' do
            expect do
                create_status(name, description)
            end.to change { Status.count }.by(1)
        end

        let(:response) { create_status(name, description) }

        it 'produces the correct response' do
            expect(response.to_h).to eq({
                "data" => {
                    "createStatus" => {
                        "status" => {
                            "name" => name,
                            "description" => description,
                        }
                    }
                }
            })
        end

        let(:duplicated_name) { "S_DUP" }

        it "provides an error message when trying to insert a duplicate status" do
            create_status(duplicated_name, description)
            response = create_status(duplicated_name, description)

            # no data should be provided
            expect(response.to_h["data"]).to eq({"createStatus" => nil})

            # only one error object should be provided
            expect(response.to_h["errors"].count).to eq(1)

            # and its error message should be 'Name has already been taken'
            error_message = response.to_h["errors"].first["message"]
            expect(error_message).to eq("Name has already been taken")
        end

        def create_status(name, description)
            mutation = <<~GQL
                mutation createStatus($input: CreateStatusInput!){
                    createStatus(input: $input) {
                        status {
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
