class ChangeAuditsToCaseAudits < ActiveRecord::Migration[6.0]
  def change
    rename_table :audits, :case_audits
  end
end
