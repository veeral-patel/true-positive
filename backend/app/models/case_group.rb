class CaseGroup < ApplicationRecord
  acts_as_tenant :tenant

  validates_uniqueness_to_tenant :group_id, :scope => :caseable_id, :message => "Cannot have duplicate members in a case."

  belongs_to :caseable, polymorphic: true
  belongs_to :group
end
