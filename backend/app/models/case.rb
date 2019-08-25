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

  acts_as_taggable_on :tags

  def to_s
    self.name
  end

  def is_merged
    # Whether or not this case has been merged into another case
    not self.merged_at.nil?
  end

  def formatted_created_at
      self.created_at.strftime("%m/%d/%y %H:%M")
  end
end
