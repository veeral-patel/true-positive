class Case < ApplicationRecord
  validates :name, presence: true
  validates :status, presence: true
  validates :priority, presence: true
  validates :created_by, presence: true

  belongs_to :created_by, :class_name => 'User'
  belongs_to :assigned_to, :class_name => 'User', optional: true
  belongs_to :merged_into, :class_name => 'Case', optional: true
  belongs_to :status
  belongs_to :priority

  has_many :tasks
  has_many :comments, as: :commentable

  has_many :case_members
  has_many :members, :through => :case_members

  acts_as_taggable_on :tags

  def to_s
    self.name
  end

  def merge_case_into(parent_case)
    # Merge this case into PARENT_CASE (which can't be this case).
    if self.id == parent_case.id
      raise ArgumentError, "Cannot merge a case into itself."
    end

    self.merged_into = parent_case
    self.merged_at = Time.now
    self.save
  end

  def is_merged
    # Whether or not this case has been merged into another case
    not self.merged_at.nil? || self.merged_into.nil?
  end

  def merged_cases
    # Lists the other cases that have been merged into this one
    Case.where(merged_into: self)
  end

  def formatted_created_at
      self.created_at.strftime("%m/%d/%y %H:%M")
  end
end
