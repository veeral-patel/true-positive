class CreatePriorities < ActiveRecord::Migration[5.2]
  def change
    create_table :priorities do |t|
      t.string :name
      t.text :description
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
