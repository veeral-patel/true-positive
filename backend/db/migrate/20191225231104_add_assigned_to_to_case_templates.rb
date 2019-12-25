class AddAssignedToToCaseTemplates < ActiveRecord::Migration[5.2]
  def change
    add_reference :case_templates, :assigned_to, foreign_key: { to_table: :users }
  end
end
