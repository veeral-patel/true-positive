---
id: create_cases_from_email
title: Create Cases from Email
sidebar_label: Create Cases from Email
---

True Positive makes it easy to create cases from inbound emails.

For example, you might want to create a case from your phishing case template for every email that's sent to phishing@company.com.

The way it works is that you generate an random inbound email address, ending in `inbound-cases@truepositive.app`, in the web console. Whenever you send an email to this inbound address, we create a case in your True Positive tenant and attach the original email.

## Set up

### Generate an inbound address

To get started, visit Manage > Integrations.

![](https://storage.googleapis.com/tp_landing_page_videos/integrations_page.png)

Now, click "Create an inbound address".

![](https://storage.googleapis.com/tp_landing_page_videos/create_an_inbound_address_drawer.png)

Cases created from emails sent to your inbound address will be initialized with the case template you choose
and will be marked as created by the default creator you choose.

### Create your first case via email

Now, copy your generated inbound address and send an email, any email, to it. You can include the inbound
address as one of several recipients, or add it to the CC or BCC fields.

In under a minute, you should receive an email with a link to your newly created case. We also attach the original
email as a file to the created case, and add a comment to the case, indicating it was created via email.

> You won't be able to access the created case unless you're:<br />  
> (1) the inbound address's default creator  
> (2) or one of the inbound address's case template's default users  
> (3) or a member of one of the inbound address's case template's default groups

### Forward emails from an existing mailbox

> We don't recommend, and haven't tested, aliasing a corporate email to a generated inbound
> address, as doing this will prevent you from replying to emails you receive.

#### Gmail

[Add a forwarding rule](https://support.google.com/mail/answer/10957?hl=en) to forward emails
from your corporate mailbox to your generated inbound address.

#### Outlook

Similarly, here's [how you add a forwarding rule with Outlook](https://support.office.com/en-us/article/use-rules-to-automatically-forward-messages-45aa9664-4911-4f96-9663-ece42816d746) (using the web app).

Your rules should look something like this once you're done:

![](https://storage.googleapis.com/tp_landing_page_videos/outlook_forwarding_rules.png)

## Update an inbound address

![](https://storage.googleapis.com/tp_landing_page_videos/update_inbound_address_drawer.png)

Click an inbound address's title to open a drawer, like in the screenshot above, where you can
update the inbound address.

## Delete an inbound address

Simply click the trash icon next to the appropriate inbound address to delete it.
