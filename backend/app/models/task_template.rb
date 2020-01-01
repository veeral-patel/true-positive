class TaskTemplate < ApplicationRecord
    acts_as_tenant :tenant

    validates :name, presence: true
    validates :created_by, presence: true

    belongs_to :created_by, :class_name => 'User'
    belongs_to :assigned_to, :class_name => 'User', optional: true
end