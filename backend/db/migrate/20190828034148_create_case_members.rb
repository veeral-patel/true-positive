class CreateCaseMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :case_members do |t|
      t.references :case, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :role
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
