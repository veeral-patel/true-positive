class GroupUser < ApplicationRecord
  validates_uniqueness_of :user_id, :scope => :group_id, :message => "Cannot have duplicate users in a group."

  belongs_to :user
  belongs_to :group
end
