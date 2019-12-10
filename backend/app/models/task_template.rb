class TaskTemplate < ApplicationRecord
    validates :name, presence: true
    validates :created_by, presence: true

    belongs_to :created_by, :class_name => 'User'
end