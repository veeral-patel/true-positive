class Attachment < ApplicationRecord
  belongs_to :created_by
  belongs_to :tenant
end
