class CaseMember < ApplicationRecord
  validates_uniqueness_to_tenant :user_id, :scope => [:caseable_type, :caseable_id], :message => "Cannot have duplicate members in a case."

  validates :role, presence: true

  belongs_to :caseable, polymorphic: true
  belongs_to :user

  enum role: { CAN_VIEW: 1, CAN_EDIT: 2 }
end
