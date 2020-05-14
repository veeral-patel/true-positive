class CreateCaseEmailAddress < ApplicationRecord
  validate :email_ends_with_correct_address
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  validates :case_template, presence: true
  validates :created_by, presence: true
  validates :default_creator, presence: true

  belongs_to :created_by, :class_name => 'User'
  belongs_to :default_creator, :class_name => 'User'
  belongs_to :case_template

  def email_ends_with_correct_address
    # A custom validator to ensure that we don't generate inbound addresses whose emails Sendgrid
    # won't pick up. Update this method if I change my inbound address in Sendgrid!

    if not email.ends_with? "@inbound-cases.truepositive.app"
      errors.add(:email, "must end with @inbound-cases.truepositive.app")
    end
  end
end
