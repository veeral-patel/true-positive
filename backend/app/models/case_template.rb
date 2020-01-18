class CaseTemplate < ApplicationRecord
  validates :name, presence: true
  validates :status, presence: true
  validates :priority, presence: true
  validates :created_by, presence: true

  belongs_to :created_by, :class_name => 'User'
  belongs_to :assigned_to, :class_name => 'User', optional: true
  belongs_to :status
  belongs_to :priority

  has_many :default_members, class_name: "CaseMember", as: :caseable, dependent: :destroy
  has_many :default_groups, class_name: "CaseGroup", as: :caseable, dependent: :destroy
  has_many :task_groups, as: :caseable, dependent: :destroy

  acts_as_taggable_on :tags

  def default_member_count
    self.default_members.count
  end

  def default_group_count
    self.default_groups.count
  end
end
