class CreateTaskTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :task_templates do |t|
      t.string :name
      t.text :description
      t.references :created_by, foreign_key: { to_table: :users }
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
