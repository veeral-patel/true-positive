class AddAssignedToToCases < ActiveRecord::Migration[5.2]
  def change
    add_reference :cases, :assigned_to, foreign_key: { to_table: :users }
  end
end
