class AddAssociatedTypeToAudits < ActiveRecord::Migration[5.2]
  def change
    add_column :audits, :associated_type, :integer
  end
end
