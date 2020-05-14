class CreateAttachments < ActiveRecord::Migration[6.0]
  def change
    create_table :attachments do |t|
      t.references :created_by, foreign_key: { to_table: :users }
      t.references :tenant, foreign_key: true
      t.references :attachable, polymorphic: true

      t.timestamps
    end
  end
end
