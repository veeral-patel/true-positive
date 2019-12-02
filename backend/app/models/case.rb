require 'ancestry'

class Case < ApplicationRecord
  has_ancestry :orphan_strategy => :rootify 

  validates :name, presence: true
  validates :status, presence: true
  validates :priority, presence: true
  validates :created_by, presence: true

  belongs_to :created_by, :class_name => 'User'
  belongs_to :assigned_to, :class_name => 'User', optional: true
  belongs_to :status
  belongs_to :priority

  has_many :tasks, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :indicators, dependent: :destroy
  has_many :case_members, dependent: :destroy

  after_create :add_creator_to_members

  acts_as_taggable_on :tags

  def add_member(user, role)
    CaseMember.create(case: self, user: user, role: role)
  end

  def remove_member(user)
    # Tries to remove an user from the case, and returns true iff the operation succeeded
    if self.case_members.length == 1
      errors[:base] << "You cannot remove the last user from a case."
      return false
    end

    begin
      member = CaseMember.find_by!(case: self, user: user)
      member.destroy
      return true
    rescue ActiveRecord::RecordNotFound => e
      errors[:base] << "The case does not have an user with username #{user.username}"
      return false
    end
  end

  def has_member(user)
    # Returns true iff the specified user is a member of this case.
    CaseMember.where(case: self, user: user).exists?
  end

  def to_s
    self.name
  end

  def merge_case_into(parent_case, reason)
    self.parent = parent_case
    self.reason_for_merging = reason
    self.save
  end

  def unmerge
    # Un-merges this case from the case it's merged into.
    self.parent = nil
    self.reason_for_merging = nil
    self.save
  end

  def is_merged
    # Whether or not this case has been merged into another case
    not self.parent.nil?
  end

  def merged_cases
    # Lists the other cases that have been merged into this one
    self.children
  end

  def merged_into
    # The case this case has been merged into
    self.parent
  end

  def completed_task_count
    # Number of completed tasks in this case
    completed_tasks = self.tasks.where(done: true)
    completed_tasks.count
  end

  def total_task_count
    # Number of total tasks in this case
    self.tasks.count
  end

  private
    def add_creator_to_members
      # Add the user who created this case to its list of members, so he/she can access it.
      self.case_members.create(user: self.created_by, role: "CAN_EDIT")
    end
end
