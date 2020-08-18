class CreateApiTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :api_tokens do |t|
      t.string :name
      t.text :api_token
      t.references :user, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
