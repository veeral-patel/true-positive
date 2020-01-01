class CreateAudits < ActiveRecord::Migration[5.2]
  def change
    create_table :audits do |t|
      t.integer :action
      t.integer :associated_id
      t.json :parameters
      t.references :created_by, foreign_key: { to_table: :users }
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
