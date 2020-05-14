class AddAncestryToCases < ActiveRecord::Migration[5.2]
  def change
    add_column :cases, :ancestry, :string
    add_index :cases, :ancestry
  end
end
