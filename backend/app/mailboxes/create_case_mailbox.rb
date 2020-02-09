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
        new_case = CaseService::CreateCaseFromTemplate.run(template: inbound_address.case_template, current_user: inbound_address.default_creator)

        # Attach the raw email to the case
        new_case.attachments.create(file: inbound_email.raw_email.blob, created_by: inbound_address.default_creator)

        # Add a comment to the case indicating it was created via email
        new_case.comments.create(
          created_by: inbound_address.default_creator,
          comment: "This case was created from an inbound email received by #{inbound_address.email} at #{Time.now.strftime("%m/%d/%Y %I:%M %p")} UTC."\
                   "\n\n"\
                   "(True Positive added this comment automatically when the case was created.)"
        )

        # Email the email's sender(s) after the case is created with a link to the case
        mail.from.each do |email_address_of_sender|
          CaseMailer.with(email_address_of_sender: email_address_of_sender, case: new_case).created_case_from_email.deliver_later
        end
      end
    end
  end
end
