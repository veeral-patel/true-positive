class AddTenantToCases < ActiveRecord::Migration[5.2]
  def change
    add_reference :cases, :tenant, foreign_key: { to_table: :tenants }
  end
end
