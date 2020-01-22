class TaskGroupTaskTemplate < ApplicationRecord
  belongs_to :task_group
  belongs_to :task_template
end
