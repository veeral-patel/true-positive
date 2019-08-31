class Indicator < ApplicationRecord
    validates :name, presence: true
    validates :created_by, presence: true
    validates :task, presence: true

    belongs_to :created_by, :class_name => 'User'
    belongs_to :task

    has_many :comments, as: :commentable
end