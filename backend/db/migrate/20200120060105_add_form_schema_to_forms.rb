class AddFormSchemaToForms < ActiveRecord::Migration[6.0]
  def change
    add_column :forms, :form_schema, :json
    add_column :forms, :ui_schema, :json
  end
end
