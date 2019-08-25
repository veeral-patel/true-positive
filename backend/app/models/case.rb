class Case < ApplicationRecord
  validates :name, presence: true
  validates :status, presence: true
  validates :priority, presence: true
  validates :created_by, presence: true

  belongs_to :created_by, :class_name => 'User', optional: false
  belongs_to :assigned_to, :class_name => 'User', optional: true
  belongs_to :status
  belongs_to :priority

  has_many :tasks
  has_many :comments, as: :commentable

  acts_as_taggable_on :tags

  def to_s
    self.name
  end

  def formatted_created_at
      self.created_at.strftime("%m/%d/%y %H:%M")
  end
end
