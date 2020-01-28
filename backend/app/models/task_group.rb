class TaskGroup < ApplicationRecord
    has_many :tasks, -> { order(position: :asc) }, dependent: :destroy
    has_many :task_group_task_templates, -> { order(position: :asc) }, dependent: :destroy
    has_many :task_templates, through: :task_group_task_templates

    belongs_to :caseable, polymorphic: true
    belongs_to :created_by, :class_name => 'User'

    validates :caseable, presence: true
    validates :name, presence: true
    validates :created_by, presence: true

    acts_as_list scope: [:caseable_id, :caseable_type], top_of_list: 0
end