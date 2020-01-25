class TaskGroup < ApplicationRecord
    has_many :tasks, -> { order(position: :asc) }, dependent: :destroy
    has_many :task_group_task_templates, dependent: :destroy
    has_many :task_templates, through: :task_group_task_templates

    belongs_to :caseable, polymorphic: true
    belongs_to :created_by, :class_name => 'User'

    validates :caseable, presence: true
    validates :name, presence: true
    validates :created_by, presence: true

    after_create :add_task_group_created_audit

    private
      def add_task_group_created_audit
          CaseAudit.create(
            action: "CREATE_TASK_GROUP",
            created_by: self.created_by
          )
      end
end