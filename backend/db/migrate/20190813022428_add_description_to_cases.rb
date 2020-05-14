class AddDescriptionToCases < ActiveRecord::Migration[5.2]
  def change
    add_column :cases, :description, :text
  end
end
