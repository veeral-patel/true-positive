class AddCreatedByToCreateCaseEmailAddresses < ActiveRecord::Migration[6.0]
  def change
    add_reference :create_case_email_addresses, :created_by, foreign_key: { to_table: :users }
  end
end
