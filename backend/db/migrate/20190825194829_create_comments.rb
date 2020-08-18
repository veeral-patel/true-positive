class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
        t.text :comment
        t.references :created_by, foreign_key: { to_table: :users }
        t.references :commentable, polymorphic: true    
        t.timestamps
    end
  end
end
