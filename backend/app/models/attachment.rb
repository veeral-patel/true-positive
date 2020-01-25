class Attachment < ApplicationRecord
  include ActionView::Helpers::NumberHelper

  belongs_to :attachable, polymorphic: true
  belongs_to :created_by, :class_name => 'User', optional: false
  
  validates :created_by, presence: true
  validates :attachable, presence: true
  validates :file, attached: true

  has_one_attached :file

  def name
    # This attachment's name
    self.file.blob.filename
  end

  def url
    # A URL you can use to access this attachment
    Rails.application.routes.url_helpers.url_for self.file
  end

  def size
    # The file size (in bytes) of this attachment
    self.file.blob.byte_size
  end

  def friendly_size
    # The file size of this attachment, formatted to be human-readable (such as "3 KB")
    number_to_human_size(self.size)
  end
end
