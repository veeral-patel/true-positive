class TaskTemplate < ApplicationRecord
    validates :name, presence: true
    belongs_to :assigned_to, :class_name => 'User', optional: true
end