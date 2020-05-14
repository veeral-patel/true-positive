class AddPositionToTask < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :position, :integer
  end
end
