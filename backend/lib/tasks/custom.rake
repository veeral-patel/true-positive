namespace :custom do
  desc "Dumps a GraphQL schema"
  task dump_schema: :environment do
    schema_definition = V1Schema.to_definition

    schema_path = "app/graphql/schema.graphql"

    # Write the schema dump
    File.write(Rails.root.join(schema_path), schema_definition)

    puts "Updated #{schema_path}"
  end
end
