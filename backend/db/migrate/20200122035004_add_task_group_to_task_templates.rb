class AddTaskGroupToTaskTemplates < ActiveRecord::Migration[6.0]
  def change
    add_reference :task_templates, :task_group, foreign_key: true
  end
end
