class AddTaskGroupToTasks < ActiveRecord::Migration[5.2]
  def change
    add_reference :tasks, :task_group, foreign_key: true
  end
end
