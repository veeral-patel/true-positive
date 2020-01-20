class Form < ApplicationRecord
    validates :name, presence: true
    validates :form_schema, presence: true
    validates :ui_schema, presence: true
    validates :created_by, presence: true

    belongs_to :created_by, :class_name => 'User'
end
