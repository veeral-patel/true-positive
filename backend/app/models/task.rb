require 'acts_as_list'

class Task < ApplicationRecord
  validates :name, presence: true
  validates :task_group, presence: true
  validates :created_by, presence: true

  belongs_to :created_by, :class_name => 'User'
  belongs_to :assigned_to, :class_name => 'User', optional: true
  belongs_to :task_group

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :attachments, as: :attachable, dependent: :destroy

  acts_as_list scope: :task_group, top_of_list: 0

  def to_s
    self.name
  end

  def attachment_count
    # Number of attachments in this task
    self.attachments.count
  end

  def case
    # The case this task is associated with (if it's associated with a case)
    self.task_group.caseable_type == "Case" ? self.task_group.caseable : nil
  end

  def comment_count
    self.comments.count
  end
end
