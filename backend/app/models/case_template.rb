class CaseTemplate < ApplicationRecord
  acts_as_tenant :tenant

  validates :name, presence: true
  validates :status, presence: true
  validates :priority, presence: true
  validates :created_by, presence: true

  belongs_to :created_by, :class_name => 'User'
  belongs_to :assigned_to, :class_name => 'User', optional: true
  belongs_to :status
  belongs_to :priority

  has_many :case_template_users

  acts_as_taggable_on :tags
end
