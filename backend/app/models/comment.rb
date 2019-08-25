class Comment < ApplicationRecord
    belongs_to :commentable, polymorphic: true

    validates :comment, presence: true
end
