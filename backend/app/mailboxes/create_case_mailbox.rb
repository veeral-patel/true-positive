class CreateCaseMailbox < ApplicationMailbox
  def process
    # Look for each recipient email address in our list of create case addresses
    mail.recipients.each do |recipient|
      address = CreateCaseEmailAddress.find_by(email: recipient)
      if not address.nil?
        # Create a case from the template associated with address
        return
      end
    end
  end
end
