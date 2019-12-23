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

  has_many :tasks
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :indicators, dependent: :destroy
  has_many :case_members, dependent: :destroy
  has_many :task_groups, dependent: :destroy

  after_create :add_creator_to_members
  after_create :add_case_created_audit

  acts_as_taggable_on :tags

  def add_member(user, role, added_by)
    # add the user to the case
    CaseMember.create(case: self, user: user, role: role)

    # generate an audit entry to record this event
    Audit.create(
      action: "ADD_MEMBER_TO_CASE",
      associated_id: self.id,
      associated_type: "CASE",
      created_by: added_by
    )
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

  def audits
    # Lists all the audit entries this case cares about

    # Changes directly affecting this case
    case_audits = Audit.where(associated_id: self.id, associated_type: "CASE")

    # Changes affecting a task in this case
    task_audits = Audit.where(associated_id: self.tasks.select(:id), associated_type: "TASK")

    # Changes affecting a task in this case
    indicator_audits = Audit.where(associated_id: self.indicators.select(:id), associated_type: "INDICATOR")

    # Combine all our audit entries
    all_audits = case_audits.or(task_audits).or(indicator_audits).order("created_at DESC")

    all_audits
  end

  def completed_task_count
    # Number of completed tasks in this case
    self.tasks.where(done: true).count
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

    def add_case_created_audit
      Audit.create(
        action: "CREATE_CASE",
        associated_id: self.id,
        associated_type: "CASE",
        created_by: self.created_by
      )
    end
end
