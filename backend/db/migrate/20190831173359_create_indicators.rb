class CreateIndicators < ActiveRecord::Migration[5.2]
  def change
    create_table :indicators do |t|
      t.string :name
      t.text :indicator
      t.text :description
      t.integer :indicator_type
      t.references :created_by, foreign_key: { to_table: :users }
      t.references :case, foreign_key: true
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
