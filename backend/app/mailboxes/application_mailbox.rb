class ApplicationMailbox < ActionMailbox::Base
  routing /inbound-cases.truepositive.app$/ => :create_case
  routing ->(inbound_email) { self.forwarded_to_an_inbound_address(inbound_email) } => :create_case

  private
    # Returns true if the inbound email was received because it was forwarded to an inbound
    # address (using Gmail, at least)
    def self.forwarded_to_an_inbound_address(inbound_email)
      if inbound_email.mail['X-Forwarded-To'].nil?
        false
      else
        inbound_email.mail['X-Forwarded-To'].value) =~ /inbound-cases.truepositive.app$/
      end
    end
end