class Mutations::Search < Mutations::BaseMutation
    description "Search for something across all cases, tasks, indicators, and other objects."

    argument :query, String, required: true do
        description "Your search query."
    end

    field :comments, [Types::CommentType], null: true do
        description "Comments matching this search query."
    end

    def resolve(query:)
        matching_comments = PgSearch.multisearch(query).where(searchable_type: "Comment").map { |document| document.searchable }
        filtered_comments = matching_comments.select { |comment| CommentPolicy.new(context[:current_user], comment).view_comment? }

        {
            "comments": filtered_comments
        }
    end
end