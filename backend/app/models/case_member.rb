class CaseMember < ApplicationRecord
  validates :role, presence: true

  belongs_to :caseable, polymorphic: true
  belongs_to :user

  enum role: { CAN_VIEW: 1, CAN_EDIT: 2 }
end
