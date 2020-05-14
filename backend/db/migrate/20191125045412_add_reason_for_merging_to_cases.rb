class AddReasonForMergingToCases < ActiveRecord::Migration[5.2]
  def change
    add_column :cases, :reason_for_merging, :text
  end
end
