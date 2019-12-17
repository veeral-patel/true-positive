class Form < ApplicationRecord
    validates :name, required: true
    validates :schema, required: true
    validates :created_by, required: true

    belongs_to :created_by, :class_name => 'User'
end
