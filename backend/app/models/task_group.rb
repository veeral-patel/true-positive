class TaskGroup < ApplicationRecord
    validates :case, presence: true
    validates :name, presence: true

    has_many :tasks
    belongs_to :case
end