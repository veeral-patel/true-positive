class CreateTaskGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :task_groups do |t|
      t.references :case, foreign_key: true
      t.string :name
      t.references :tenant, foreign_key: true
    end
  end
end
