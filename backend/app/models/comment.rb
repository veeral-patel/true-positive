class Comment < ApplicationRecord
    acts_as_tenant :tenant

    include PgSearch::Model
    multisearchable against: [:comment, :created_by]

    belongs_to :commentable, polymorphic: true
    belongs_to :created_by, :class_name => 'User', optional: false

    validates :comment, presence: true
    validates :created_by, presence: true
    validates :commentable, presence: true

    after_create :add_comment_created_audit

    private
        def add_comment_created_audit
            Audit.create(
                action: "CREATE_COMMENT",
                associated_id: self.id,
                associated_type: "COMMENT",
                created_by: self.created_by
            )
        end
end
