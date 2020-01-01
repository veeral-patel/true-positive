class AddIdentifierToTenants < ActiveRecord::Migration[5.2]
  def change
    add_column :tenants, :identifier, :string
  end
end
