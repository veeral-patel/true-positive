class Indicator < ApplicationRecord
    enum indicator_type: { STRING: 1, TEXT: 2, FILE: 3 }

    validates :name, presence: true
    validates :indicator, presence: true
    validates :created_by, presence: true
    validates :case, presence: true
    validates :indicator_type, presence: true

    belongs_to :created_by, :class_name => 'User'
    belongs_to :case

    has_many :comments, as: :commentable, dependent: :destroy
    has_many :attachments, as: :attachable, dependent: :destroy

    acts_as_taggable_on :tags

    after_create :add_indicator_created_audit

    def attachment_count
      # Number of attachments in this task
      self.attachments.count
    end

    private
      def add_indicator_created_audit
        CaseAudit.create(
          action: "CREATE_INDICATOR",
          created_by: self.created_by
        )
      end
end