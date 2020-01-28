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

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :indicators, dependent: :destroy
  has_many :case_members, as: :caseable, dependent: :destroy
  has_many :case_groups, as: :caseable, dependent: :destroy
  has_many :task_groups, -> { order(position: :asc) }, as: :caseable, dependent: :destroy
  has_many :tasks, through: :task_groups
  has_many :attachments, as: :attachable, dependent: :destroy

  after_create :add_creator_to_members

  acts_as_taggable_on :tags

  def link_to_case
    if Rails.env.development?
      "http://localhost:3000/cases/#{self.id}"
    elsif Rails.env.production?
      "https://console.truepositive.app/cases/#{self.id}"
    else
      raise "Your environment must be either development or production to get a link to a case."
    end
  end

  def has_member(user)
    # Returns true iff the specified user is a member of this case.
    self.case_members.where(user: user).exists?
  end

  def to_s
    self.name
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

  def case_member_count
    self.case_members.count
  end

  def case_group_count
    self.case_groups.count
  end

  def completed_task_count
    # Number of completed tasks in this case
    self.tasks.where(done: true).count
  end

  def total_task_count
    # Number of total tasks in this case
    self.tasks.count
  end

  def task_group_count
    # Number of task groups in this case
    self.task_groups.count
  end

  def attachment_count
    # Number of attachments in this case
    self.attachments.count
  end

  private
    def add_creator_to_members
      # Add the user who created this case to its list of members, so he/she can access it.
      self.case_members.create(user: self.created_by, role: "CAN_EDIT")
    end
end
