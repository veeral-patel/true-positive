class TaskGroupTaskTemplate < ApplicationRecord
  belongs_to :task_group
  belongs_to :task_template

  acts_as_list scope: :task_group, top_of_list: 0
end
