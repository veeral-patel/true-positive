class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.boolean :done, default: false, null: false
      t.references :case, foreign_key: true
      t.references :created_by, foreign_key: { to_table: :users }
      t.references :assigned_to, foreign_key: { to_table: :users }
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
