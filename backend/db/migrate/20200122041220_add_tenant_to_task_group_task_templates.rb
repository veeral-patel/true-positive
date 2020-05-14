class AddTenantToTaskGroupTaskTemplates < ActiveRecord::Migration[6.0]
  def change
    add_reference :task_group_task_templates, :tenant, foreign_key: true
  end
end
