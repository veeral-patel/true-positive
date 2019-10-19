class Indicator < ApplicationRecord
    enum type: { STRING: 1, TEXT: 2, FILE: 3 }

    validates :name, presence: true
    validates :created_by, presence: true
    validates :case, presence: true
    validates :type, presence: true

    belongs_to :created_by, :class_name => 'User'
    belongs_to :case

    has_many :comments, as: :commentable

    acts_as_taggable_on :tags
end