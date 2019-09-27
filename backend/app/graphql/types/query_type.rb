require_relative '../helpers'

module Types
  class QueryType < Types::BaseObject
      description "Use queries to fetch data."

      # ---------- Statuses -------------------

      field :statuses, [Types::StatusType], null: false do
          description "Lists all statuses."
      end

      def statuses
          Status.all
      end

      field :status, Types::StatusType, null: false do
          description "Retrieve a status by its ID."

          argument :id, ID, required: true do
            description "The ID of the status to retrieve."
          end
      end

      def status(id:)
          find_status_or_throw_execution_error(status_id: id)
      end

      # ---------- Priorities -------------------

      field :priorities, [Types::PriorityType], null: false do
        description "Lists all priorities."
      end

      def priorities
          Priority.all
      end

      field :priority, Types::PriorityType, null: false do
        description "Retrieve a priority by its ID."

        argument :id, ID, required: true do
          description "The ID of the priority to retrieve."
        end
      end

      def priority(id:)
        find_priority_or_throw_execution_error(priority_id: id)
      end

      # -------------- Cases -------------------

      field :cases, [Types::CaseType], null: false do
        description "List all cases."
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
        find_case_or_throw_execution_error(case_id: id)
      end

      # --------------- Users --------------------
      field :users, [Types::UserType], null: false do
        description "List all users."
      end

      def users
        User.all
      end

      field :user, Types::UserType, null: false do
        description "Retrieve an user by the user's ID."

        argument :id, ID, required: true do
          description "The ID (not the username) of the user to retrieve."
        end
      end

      def user(id:)
        find_user_or_throw_execution_error(user_id: id)
      end

      field :me, Types::UserType, null: true do
      end

      def me
        context[:current_user]
      end

      # --------------- Tags -----------------------
      field :tags, [Types::TagType], null: false do
        description "List all existing tags."
      end

      def tags
        ActsAsTaggableOn::Tag.all
      end

      # -------------- Tasks ------------------------
      field :tasks, [Types::TaskType], null: false do
        description "Lists all tasks."
      end
      
      def tasks
        Task.all
      end
  end
end
