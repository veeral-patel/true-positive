class RemoveCaseFromTasks < ActiveRecord::Migration[5.2]
  def change
    remove_column :tasks, :case_id
  end
end
