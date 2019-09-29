require 'ancestry'

class Case < ApplicationRecord
  has_ancestry

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

  def to_s
    self.name
  end

  def merge_case_into(parent_case)
    self.parent = parent_case
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

  def formatted_created_at
      self.created_at.strftime("%m/%d/%y %H:%M")
  end

  private
    def destroy_merged_cases
      self.merged_cases.each { |the_case| the_case.destroy } 
    end

    def add_creator_to_members
      # Add the user who created this case to its list of members, so he/she can access it.
      self.case_members.create(user: self.created_by, role: "CAN_EDIT")
    end
end
