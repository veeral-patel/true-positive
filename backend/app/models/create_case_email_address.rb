class CreateCaseEmailAddress < ApplicationRecord
  acts_as_tenant :tenant

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  validates :case_template, presence: true

  belongs_to :case_template
end
