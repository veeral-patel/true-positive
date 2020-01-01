class RemoveIdentifierFromTenants < ActiveRecord::Migration[5.2]
  def change
    remove_column :tenants, :identifier, :string
  end
end
