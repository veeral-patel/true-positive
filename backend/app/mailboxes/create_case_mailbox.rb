class CreateCaseMailbox < ApplicationMailbox
  def process
    # Look for each recipient email address in our list of inbound addresses
    mail.recipients.each do |recipient|
      inbound_address = InboundEmailAddress.find_by(email: recipient)
      if not inbound_address.nil?
        # Create a case from the template associated with inbound_address
        return
      end
    end
  end
end
