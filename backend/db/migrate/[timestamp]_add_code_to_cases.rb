class AddCodeToCases < ActiveRecord::Migration[6.0]
  def change
    add_column :cases, :code, :string, null: false
    add_index :cases, :code, unique: true
  end
end
