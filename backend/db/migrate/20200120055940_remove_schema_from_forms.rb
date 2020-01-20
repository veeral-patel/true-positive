class RemoveSchemaFromForms < ActiveRecord::Migration[6.0]
  def change
    remove_column :forms, :schema
  end
end
