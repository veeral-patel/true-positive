class User < ApplicationRecord
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

    validates :username, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true

    def to_s
        self.username
    end

    # Lists the cases this user is a member of
    def joined_cases
        # get the CaseMember records involving this user
        members = CaseMember.select { |member| member.user == self }

        # and return the case for each CaseMember record
        return members.map { |member| member.case }
    end
end
