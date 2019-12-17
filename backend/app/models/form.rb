class Form < ApplicationRecord
    validates :name, presence: true
    validates :schema, presence: true
    validates :created_by, presence: true

    belongs_to :created_by, :class_name => 'User'
end
