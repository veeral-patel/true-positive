class Indicator < ApplicationRecord
    enum indicator_type: { STRING: 1, TEXT: 2, FILE: 3 }

    validates :name, presence: true
    validates :indicator, presence: true
    validates :created_by, presence: true
    validates :case, presence: true
    validates :indicator_type, presence: true

    belongs_to :created_by, :class_name => 'User'
    belongs_to :case

    has_many :comments, as: :commentable

    acts_as_taggable_on :tags

    after_create :add_indicator_created_audit

    private
    def add_indicator_created_audit
      Audit.create(
        action: "CREATE_INDICATOR",
        associated_id: self.id,
        associated_type: "INDICATOR",
        created_by: self.created_by
      )
    end
end