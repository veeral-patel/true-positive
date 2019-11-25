class AddMergeReasonToCases < ActiveRecord::Migration[5.2]
  def change
    add_column :cases, :merge_reason, :text
  end
end
