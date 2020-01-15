class ApplicationMailbox < ActionMailbox::Base
  routing /inbound-cases.truepositive.app$/ => :create_case
end