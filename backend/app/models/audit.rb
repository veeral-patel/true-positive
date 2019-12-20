class Audit < ApplicationRecord
    enum associated_type: { CASE: 1 }
    enum action: {
        CREATE_CASE: 1
    }

    validates :action, presence: true
    validates :associated_type, presence: true
    validates :associated_id, presence: true
    validates :created_by, presence: true
    validates :created_at, presence: true
end
