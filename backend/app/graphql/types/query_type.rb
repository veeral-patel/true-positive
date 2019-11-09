require_relative '../helpers'

module Types
  class QueryType < Types::BaseObject
      description "Use queries to fetch data."

      # ---------- Statuses -------------------

      field :statuses, [Types::StatusType], null: false do
          description "Lists all statuses a case can have."
      end

      def statuses
          Status.all
      end

      # ---------- Priorities -------------------

      field :priorities, [Types::PriorityType], null: false do
        description "Lists all priorities a case can have."
      end

      def priorities
          Priority.all
      end

      # -------------- Cases -------------------

      field :cases, [Types::CaseType], null: false do
        description "Lists all cases (that you're a member of)."
      end

      def cases
        CasePolicy::Scope.new(context[:current_user]).resolve
      end

      field :case, Types::CaseType, null: false do
        description "Retrieve a case by its ID."

        argument :id, ID, required: true do
          description "The ID of the case to retrieve."
        end
      end

      def case(id:)
        the_case = find_case_or_throw_execution_error(case_id: id)

        unless CasePolicy.new(context[:current_user], the_case).show_case?
          raise GraphQL::ExecutionError, "Only a case's members can view it."
        end

        the_case
      end

      # --------------- Users --------------------
      field :users, [Types::UserType], null: false do
        description "Lists all users."
      end

      def users
        User.all
      end

      # ------------------- Me ----------------------

      field :me, Types::UserType, null: true do
        description "Retrieve the logged in user."
      end

      def me
        context[:current_user]
      end

      # --------------- Tags -----------------------
      field :tags, [Types::TagType], null: false do
        description "List all tags that have been applied to a case or an indicator."
      end

      def tags
        ActsAsTaggableOn::Tag.all
      end

      # -------------- Tasks ------------------------
      field :tasks, [Types::TaskType], null: false do
        description "Lists all the tasks from the cases you're a member of."
      end
      
      def tasks
        TaskPolicy::Scope.new(context[:current_user]).resolve
      end

      # --------------- Indicators -------------------
      field :indicators, [Types::IndicatorType], null: false do
        description "Lists all the indicators from the cases you're a member of."
      end
      
      def indicators
        IndicatorPolicy::Scope.new(context[:current_user]).resolve
      end
  end
end
