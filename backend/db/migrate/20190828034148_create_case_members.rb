class CreateCaseMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :case_members do |t|
      t.references :caseable, polymorphic: true
      t.references :user, foreign_key: true
      t.integer :role

      t.timestamps
    end
  end
end
