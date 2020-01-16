class Attachment < ApplicationRecord
  acts_as_tenant :tenant

  belongs_to :attachable, polymorphic: true
  belongs_to :created_by, :class_name => 'User', optional: false
  
  validates :created_by, presence: true
  validates :attachable, presence: true

  has_one_attachment :file
end
