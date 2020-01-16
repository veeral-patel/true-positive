class TaskGroup < ApplicationRecord
    acts_as_tenant :tenant

    validates :caseable, presence: true
    validates :name, presence: true
    validates :created_by, presence: true

    has_many :tasks, -> { order(position: :asc) }, dependent: :destroy
    belongs_to :caseable
    belongs_to :created_by, :class_name => 'User'

    after_create :add_task_group_created_audit

    private
      def add_task_group_created_audit
          Audit.create(
            action: "CREATE_TASK_GROUP",
            associated_id: self.id,
            associated_type: "TASK_GROUP",
            created_by: self.created_by
          )
      end
end