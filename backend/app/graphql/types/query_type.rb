require_relative '../helpers'

module Types
  class QueryType < Types::BaseObject
      description "Queries are used for retrieving data."

      # ---------- Statuses -------------------

      field :statuses, [Types::StatusType], null: false do
          description "Lists all statuses."
      end

      def statuses
          Status.all
      end

      field :status, Types::StatusType, null: false do
          description "Retrieve a status."

          argument :id, ID, required: true
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
        description "Retrieve a priority."

        argument :id, ID, required: true
      end

      def priority(id:)
        find_priority_or_throw_execution_error(priority_id: id)
      end

      # -------------- Cases -------------------

      field :cases, [Types::CaseType], null: false do
        description "List all cases."
      end

      def cases
        Case.all
      end

      field :case, Types::CaseType, null: false do
        description "Retrieve a case."

        argument :id, ID, required: true
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
        description "Retrieve an user"

        argument :id, ID, required: true
      end

      def user(id:)
        find_user_or_throw_execution_error(user_id: id)
      end

      # --------------- Tags -----------------------
      field :tags, [Types::TagType], null: false do
        description "List all existing tags."
      end

      def tags
        ActsAsTaggableOn::Tag.all
      end
  end
end
