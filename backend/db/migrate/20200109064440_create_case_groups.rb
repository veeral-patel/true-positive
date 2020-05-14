class CreateCaseGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :case_groups do |t|
      t.references :caseable, polymorphic: true
      t.references :group, foreign_key: true
      t.references :tenant, foreign_key: true

      t.timestamps
    end
  end
end
