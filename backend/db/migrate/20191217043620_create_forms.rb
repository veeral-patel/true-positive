class CreateForms < ActiveRecord::Migration[5.2]
  def change
    create_table :forms do |t|
      t.string :name
      t.json :schema
      t.references :created_by, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
