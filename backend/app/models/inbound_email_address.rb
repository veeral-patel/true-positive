class InboundEmailAddress < ApplicationRecord
  acts_as_tenant :tenant

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
end
