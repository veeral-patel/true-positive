class CreateAudits < ActiveRecord::Migration[5.2]
  def change
    create_table :audits do |t|
      t.string :action
      t.integer :associated_type
      t.integer :associated_id
      t.string :comment
      t.json :parameters
      t.references :created_by, foreign_key: { to_table: :users }
      t.datetime :created_at

      t.timestamps
    end
  end
end
