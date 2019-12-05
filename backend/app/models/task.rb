require 'acts_as_list'

class Task < ApplicationRecord
  validates :name, presence: true
  validates :case, presence: true
  validates :task_group, presence: true
  validates :created_by, presence: true

  belongs_to :created_by, :class_name => 'User'
  belongs_to :assigned_to, :class_name => 'User', optional: true
  belongs_to :case
  belongs_to :task_group

  acts_as_list scope: :case, top_of_list: 0

  has_many :comments, as: :commentable

  def to_s
    self.name
  end
end
