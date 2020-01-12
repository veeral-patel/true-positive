class CreateInboundEmailAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :inbound_email_addresses do |t|
      t.string :email
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
