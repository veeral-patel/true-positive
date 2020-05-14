class AddRoleToCaseGroups < ActiveRecord::Migration[6.0]
  def change
    add_column :case_groups, :role, :integer
  end
end
