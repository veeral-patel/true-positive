class CreateTaskTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :task_templates do |t|
      t.string :name
      t.text :description
      t.references :assigned_to, foreign_key: { to_table: :users }
    end
  end
end
