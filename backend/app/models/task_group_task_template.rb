class TaskGroupTaskTemplate < ApplicationRecord
  validates_uniqueness_to_tenant :task_template_id, :scope => :task_group_id, :message => "Cannot have duplicate task templates in a group."

  belongs_to :task_group
  belongs_to :task_template

  acts_as_list scope: :task_group, top_of_list: 0
end
