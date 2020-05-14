class AddDefaultStatusToStatuses < ActiveRecord::Migration[5.2]
  def change
    add_column :statuses, :default_status, :boolean, default: false, null: false
  end
end

