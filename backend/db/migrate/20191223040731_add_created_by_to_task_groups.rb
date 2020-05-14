class AddCreatedByToTaskGroups < ActiveRecord::Migration[5.2]
  def change
    add_reference :task_groups, :created_by, foreign_key: { to_table: :users }
  end
end
