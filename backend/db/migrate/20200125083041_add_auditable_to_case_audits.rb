class AddAuditableToCaseAudits < ActiveRecord::Migration[6.0]
  def change
      add_reference :case_audits, :auditable, polymorphic: true
  end
end
