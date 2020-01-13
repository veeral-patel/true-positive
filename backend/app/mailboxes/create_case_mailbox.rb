class CreateCaseMailbox < ApplicationMailbox
  def process
    # For each recipient email address
    mail.recipients.each do |recipient|
      # If the recipient email is the email of an inbound create case email address...
      inbound_address = CreateCaseEmailAddress.find_by(email: recipient)
      if not inbound_address.nil?
        # Set the current tenant based upon the inbound address
        ActsAsTenant.current_tenant = inbound_address.tenant

        # Then create a case from the template associated with the inbound address
        # Note that created_by is set to the creator of the template
        CaseService::CreateCaseFromTemplate.run(template: inbound_address.case_template, created_by: inbound_address.case_template.created_by)
      end
    end
  end
end
