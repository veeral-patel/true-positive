class CaseTemplateUser < ApplicationRecord
  acts_as_tenant :tenant

  validates_uniqueness_to_tenant :user_id, :scope => :case_template_id, :message => "Cannot have duplicate users in a case template."

  belongs_to :case_template
  belongs_to :user

  enum role: CaseMember.role
end
