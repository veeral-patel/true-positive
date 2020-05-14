class AddPositionToTaskGroup < ActiveRecord::Migration[6.0]
  def change
    add_column :task_groups, :position, :integer
  end
end
