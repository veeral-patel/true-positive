class ApplicationMailbox < ActionMailbox::Base
  routing :all => :create_case
end
