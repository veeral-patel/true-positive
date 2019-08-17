require 'rails_helper'

module Types
    RSpec.describe QueryType, type: :request do
        before :each do
            open_status = Status.create(name: "Open", description: "Work on me!")
            Status.create(name: "Closed", description: "Don't bother!")

            low_priority =Priority.create(name: "Low", description: "It's not worth it")
            Priority.create(name: "High", description: "Get started now!")

            lame_user = User.create(username: "lame_user")
            cool_user = User.create(username: "cool_user")

            the_case = Case.create(
                name: "An case",
                description: "An case's description",
                status: open_status,
                priority: low_priority,
                created_by: lame_user,
                assigned_to: cool_user,
                tag_list: ["tag1", "tag2"]
            )

            Case.create(
                name: "Another case",
                description: "Another case's description",
                status: open_status,
                priority: low_priority,
                created_by: lame_user,
            )

            Task.create(
                name: "A task",
                description: "A task's description",
                status: open_status,
                priority: low_priority,
                created_by: lame_user,
                case: the_case
            )
        end

        it "doesn't let you retrieve a case with an invalid id" do
            response = retrieve_a_case(-1)

            # don't provide any data if the ID is invalid
            expect(response.to_h["data"]).to eq(nil) 

            # we should only get one error
            expect(response.to_h["errors"].count).to eq(1) 

            # and verify the error message is what we expect
            error_message = response.to_h["errors"].first["message"]
            expect(error_message).to eq("Could not find a case with id -1.")
        end

        it "doesn't let you retrieve a status with an invalid id" do
            response = retrieve_a_status(-1)

            # don't provide any data if the ID is invalid
            expect(response.to_h["data"]).to eq(nil) 

            # we should only get one error
            expect(response.to_h["errors"].count).to eq(1) 

            # and verify the error message is what we expect
            error_message = response.to_h["errors"].first["message"]
            expect(error_message).to eq("Could not find a status with id -1.")
        end

        it "doesn't let you retrieve a priority with an invalid id" do
            response = retrieve_a_priority(-1)

            # don't provide any data if the ID is invalid
            expect(response.to_h["data"]).to eq(nil) 

            # we should only get one error
            expect(response.to_h["errors"].count).to eq(1) 

            # and verify the error message is what we expect
            error_message = response.to_h["errors"].first["message"]
            expect(error_message).to eq("Could not find a priority with id -1.")
        end

        it 'lets you retrieve a status by its id' do 
            open_status = Status.where(name: "Open").take
            response = retrieve_a_status(open_status.id)

            expect(response.to_h).to eq({
                "data" => {
                    "status" => {
                        "name" => "Open",
                        "description" => "Work on me!"
                    }
                }
            }) 
        end

        it 'lets you retrieve a case by its id' do
            an_case = Case.where(name: "An case").take
            response = retrieve_a_case(an_case.id)

            expect(response.to_h).to eq({
                "data" => {
                    "case" => {
                        "name" => "An case",
                        "description" => "An case's description",
                        "createdBy" => {
                            "username" => "lame_user"
                        },
                        "assignedTo" => {
                            "username" => "cool_user"
                        },
                        "status" => {
                            "name" => "Open"
                        },
                        "priority" => {
                            "name" => "Low"
                        },
                        "tags" => ["tag2", "tag1"]
                    }
                }
            })
        end

        it 'lets you retrieve a priority by its id' do 
            open_priority = Priority.where(name: "Low").take
            response = retrieve_a_priority(open_priority.id)

            expect(response.to_h).to eq({
                "data" => {
                    "priority" => {
                        "name" => "Low",
                        "description" => "It's not worth it"
                    }
                }
            }) 
        end

        it 'lists statuses' do
            expect(list_statuses.to_h).to eq({
                "data" => {
                    "statuses" => [
                        { "name" => "Open", "description" => "Work on me!" },
                        { "name" => "Closed", "description" => "Don't bother!" },
                    ]
                }
            })
        end

        it 'lists cases' do
            expect(list_cases.to_h).to eq({
                "data" => {
                    "cases" => [
                        {
                            "name" => "An case",
                            "description" => "An case's description",
                            "assignedTo" => {
                                "username" => "cool_user"
                            },
                            "tags" => ["tag2", "tag1"],
                            "tasks" => [{
                                "name" => "A task"
                            }]
                        },
                        {
                             "name" => "Another case",
                             "description" => "Another case's description",
                             "assignedTo" => nil,
                             "tags" => [],
                             "tasks" => []
                        },
                    ]
                }
            })
        end

        it 'lists priorities' do
            expect(list_priorities.to_h).to eq({
                "data" => {
                    "priorities" => [
                        { "name" => "Low", "description" => "It's not worth it" },
                        { "name" => "High", "description" => "Get started now!" },
                    ]
                }
            })
        end

        def list_statuses
            query = <<~GQL
                query {
                    statuses {
                        name
                        description
                    }
                }
            GQL
            
            V1Schema.execute(query)
        end

        def list_cases
            query = <<~GQL
                query {
                    cases {
                        name
                        description
                        assignedTo {
                            username
                        }
                        tasks {
                            name
                        }
                        tags
                    }
                }
            GQL

            V1Schema.execute(query)
        end

        def list_priorities
            query = <<~GQL
                query {
                    priorities {
                        name
                        description
                    }
                }
            GQL

            V1Schema.execute(query)
        end

        def retrieve_a_status(id)
            query = <<~GQL
                query getStatus($id: ID!) {
                    status(id: $id) {
                        name
                        description
                    }
                }
            GQL

            V1Schema.execute(query, variables: {
                id: id
            })
        end

        def retrieve_a_priority(id)
            query = <<~GQL
                query getPriority($id: ID!) {
                    priority(id: $id) {
                        name
                        description
                    }
                }
            GQL

            V1Schema.execute(query, variables: {
                id: id
            })
        end

        def retrieve_a_case(id)
            query = <<~GQL
                query getCase($id: ID!) {
                    case(id: $id) {
                        name
                        description
                        createdBy {
                            username
                        }
                        assignedTo {
                            username
                        }
                        status {
                            name
                        }
                        priority {
                            name
                        }
                        tags
                    }
                }
            GQL

            V1Schema.execute(query, variables: {
                id: id
            })
        end
    end
end