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

  has_many :default_members, foreign_key: "caseable_id", class_name: "CaseMember", as: :caseable
  has_many :default_groups, foreign_key: "caseable_id", class_name: "CaseGroup", as: :caseable

  acts_as_taggable_on :tags

  def default_member_count
    self.default_members.count
  end

  def default_group_count
    self.default_groups.count
  end
end
