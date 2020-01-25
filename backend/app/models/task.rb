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

  after_create :add_task_created_audit

  def to_s
    self.name
  end

  def attachment_count
    # Number of attachments in this task
    self.attachments.count
  end

  def case
    if self.task_group.caseable_type == "Case"
      self.task_group.caseable
    else
      nil
    end
  end

  def comment_count
    self.comments.count
  end

  private
    def add_task_created_audit
      CaseAudit.create(
        action: "CREATE_TASK",
        associated_id: self.id,
        associated_type: "TASK",
        created_by: self.created_by
      )
    end
end
