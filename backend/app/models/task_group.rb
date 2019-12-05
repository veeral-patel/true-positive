class TaskGroup < ApplicationRecord
    validates :case, presence: true
    validates :name, presence: true

    has_many :tasks, -> { order(position: :asc) }, dependent: :destroy
    belongs_to :case
end