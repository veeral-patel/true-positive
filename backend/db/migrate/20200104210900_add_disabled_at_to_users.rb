class AddDisabledAtToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :disabled_at, :datetime
  end
end
