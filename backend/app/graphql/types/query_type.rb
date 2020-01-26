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
        description "Lists all active users."
      end

      def users
        User.select { |user| not user.disabled }
      end

      field :all_users, [Types::UserType], null: false do
        description "Lists all users, including disabled users."
      end

      def all_users
        User.all
      end

      # --------------- Groups --------------------

      field :groups, [Types::GroupType], null: false do
        description "Lists all user groups."
      end

      def groups
        Group.all
      end

      field :group, Types::GroupType, null: false do
        description "Retrieve a group by its ID."

        argument :id, ID, required: true do
          description "The ID of the group to retrieve."
        end
      end

      def group(id:)
        find_group_or_throw_execution_error(id: id)
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

      # ------------- Task Templates ------------------
      field :task_templates, [Types::TaskTemplateType], null: false do
        description "Lists all task templates."
      end

      def task_templates
        TaskTemplate.all
      end

      field :task_template, Types::TaskTemplateType, null: false do
        description "Retrieve a task template by its ID."

        argument :id, ID, required: true do
          description "The ID of the task template to retrieve."
        end
      end

      def task_template(id:)
        the_template = find_task_template_or_throw_execution_error(id: id)

        the_template
      end

      # ----------------- Forms --------------------
      # field :forms, [Types::FormType], null: false do
      #   description "Lists all forms."
      # end

      # def forms
      #   Form.all
      # end

      # ---------------- Case Templates ------------------
      field :case_templates, [Types::CaseTemplateType], null: false do
        description "Lists all case templates."
      end

      def case_templates
        CaseTemplate.all
      end

      field :case_template, Types::CaseTemplateType, null: false do
        description "Retrieve a case template by its ID."

        argument :id, ID, required: true do
          description "The ID of the case template to retrieve."
        end
      end

      def case_template(id:)
        find_case_template_or_throw_execution_error(id: id)
      end

      # ------------- API Tokens ---------------------
      field :api_tokens, [Types::ApiTokenType], null: false do
        description "Lists the current user's API tokens."
      end

      def api_tokens
        ApiTokenPolicy::Scope.new(context[:current_user]).resolve
      end

      # ------------- Create Case Email Addresses -------
      field :create_case_email_addresses, [Types::CreateCaseEmailAddressType], null: false do
        description "Lists the email addresses you've set up that create cases from emails sent to them."
      end

      def create_case_email_addresses
        CreateCaseEmailAddress.all
      end

      field :create_case_email_address, Types::CreateCaseEmailAddressType, null: false do
        description "Retrieve a single inbound address by its ID."

        argument :id, ID, required: true do
          description "ID of the address to retrieve."
        end
      end

      def create_case_email_address(id:)
        find_create_case_email_address_or_throw_execution_error(id: id)
      end
  end
end
