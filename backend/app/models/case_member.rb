class CaseMember < ApplicationRecord
  belongs_to :case
  belongs_to :member, :class_name => 'User', :foreign_key => 'user_id'

  enum role: { CAN_VIEW: 1, CAN_EDIT: 2 }
end
