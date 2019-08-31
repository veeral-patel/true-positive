class CreateObservables < ActiveRecord::Migration[5.2]
  def change
    create_table :observables do |t|
      t.string :name
      t.text :description
      t.references :created_by, foreign_key: { to_table: :users }
      t.references :task, foreign_key: true
    end
  end
end
