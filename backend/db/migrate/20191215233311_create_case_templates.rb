class CreateCaseTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :case_templates do |t|
      t.string :name
      t.text :description
      t.references :status, foreign_key: true
      t.references :priority, foreign_key: true

      t.timestamps
    end
  end
end
