class CreateTaskGroupTaskTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :task_group_task_templates do |t|
      t.references :task_group, foreign_key: true
      t.references :task_template, foreign_key: true
    end
  end
end
