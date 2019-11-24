class TaskTemplate < ApplicationRecord
    validates :name, presence: true
    validates :created_by, presence: true

    belongs_to :assigned_to, :class_name => 'User', optional: true
end