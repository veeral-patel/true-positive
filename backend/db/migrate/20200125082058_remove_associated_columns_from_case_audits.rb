class RemoveAssociatedColumnsFromCaseAudits < ActiveRecord::Migration[6.0]
  def change
    remove_column :case_audits, :associated_id
    remove_column :case_audits, :associated_type
  end
end
