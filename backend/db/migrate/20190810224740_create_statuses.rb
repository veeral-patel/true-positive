class CreateStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :statuses do |t|
      t.string :name
      t.text :description
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
