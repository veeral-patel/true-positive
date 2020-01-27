class CaseGroup < ApplicationRecord
  validates_uniqueness_to_tenant :group_id, :scope => [:caseable_type, :caseable_id], :message => "Cannot have duplicate groups in a case."

  validates :role, presence: true

  belongs_to :caseable, polymorphic: true
  belongs_to :group

  enum role: CaseMember.roles
end
