class Audit < ApplicationRecord
    validates :action, presence: true
    validates :associated_type, presence: true
    validates :associated_id, presence: true
    validates :created_by, presence: true
    validates :created_at, presence: true
end
