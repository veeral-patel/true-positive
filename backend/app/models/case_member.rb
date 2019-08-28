class CaseMember < ApplicationRecord
  validates_uniqueness_of :user_id, :scope => :case_id, :message => "Cannot have duplicate members in a case."
  validates :role, presence: true

  belongs_to :case
  belongs_to :member, :class_name => 'User', :foreign_key => 'user_id'

  enum role: { CAN_VIEW: 1, CAN_EDIT: 2 }
end
