class User < ApplicationRecord
    acts_as_tenant :tenant

    include RailsJwtAuth::Authenticatable

    has_many :created_cases, foreign_key: "created_by_id", class_name: "Case"
    has_many :created_task_groups, foreign_key: "created_by_id", class_name: "TaskGroup"
    has_many :created_tasks, foreign_key: "created_by_id", class_name: "Task"
    has_many :created_indicators, foreign_key: "created_by_id", class_name: "Indicator"
    has_many :created_task_templates, foreign_key: "created_by_id", class_name: "TaskTemplate"
    has_many :created_case_templates, foreign_key: "created_by_id", class_name: "CaseTemplate"
    has_many :created_forms, foreign_key: "created_by_id", class_name: "Form"
    has_many :comments, foreign_key: "created_by_id", class_name: "Comment"
    has_many :api_tokens, foreign_key: "user_id", class_name: "ApiToken"
    has_many :group_users
    has_many :groups, through: :group_users

    validates :username, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true

    def to_s
        self.username
    end

    def disabled
        not self.disabled_at.nil?
    end

    def disable
        self.disabled_at = Time.now
        self.save
    end

    # Lists the cases this user is a member of
    def joined_cases
        # get the CaseMember records involving this user
        members = CaseMember.where(user: self, caseable_type: "Case")

        # and return the case for each CaseMember record
        return members.map { |member| member.caseable }
    end
end
