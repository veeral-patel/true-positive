class CreateCreateCaseEmailAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :create_case_email_addresses do |t|
      t.string :email
      t.references :case_template, foreign_key: true

      t.timestamps
    end
  end
end
