class CaseGroup < ApplicationRecord
  validates :role, presence: true

  belongs_to :caseable, polymorphic: true
  belongs_to :group

  enum role: CaseMember.roles
end
