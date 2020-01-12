class CreateCaseMailbox < ApplicationMailbox
  def process
    # get the recipient of the email

    # look for the recipient in our inbound_addresses database table

    # if we find it, then ---

      # get the raw email from the email.
      # questions: is the raw email a file? do I need to upload it somewhere to avoid incineration? should I never incinerate?

      # create a new case

      # attach the raw email to the case

      # reply to the email saying thank you for your email, here is the
      # link to the case that's been created, and add a line saying "Powered by True Positive"

    # if we don't find it, then ---

        # reply to the email saying the email address you sent to doesn't correspond
        # to any inbound email address in our database
  end
end
