class CreateTaskGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :task_groups do |t|
      t.references :caseable, polymorphic: true
      t.string :name
      t.references :tenant, foreign_key: true
    end
  end
end
