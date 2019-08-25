class AddMergedAtToCases < ActiveRecord::Migration[5.2]
  def change
    add_column :cases, :merged_at, :datetime
    add_reference :cases, :merged_into, foreign_key: { to_table: :cases }
  end
end
