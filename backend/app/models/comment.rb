class Comment < ApplicationRecord
    belongs_to :commentable, polymorphic: true
    belongs_to :created_by, :class_name => 'User', optional: false

    validates :comment, presence: true
    validates :created_by, presence: true
    validates :commentable, presence: true
end
