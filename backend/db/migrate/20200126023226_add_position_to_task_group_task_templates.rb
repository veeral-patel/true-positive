class AddPositionToTaskGroupTaskTemplates < ActiveRecord::Migration[6.0]
  def change
    add_column :task_group_task_templates, :position, :integer
  end
end
