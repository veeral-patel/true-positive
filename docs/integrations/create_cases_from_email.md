---
id: create_cases_from_email
title: Create Cases from Email
sidebar_label: Create Cases from Email
---

True Positive makes it easy to create cases from inbound emails.

For example, you might want to create a case from your phishing case template for every email that's sent to phishing@company.com.

The way it works is that you generate an random inbound email address, ending in `inbound-cases@truepositive.app`, in the web console. Whenever you send an email to this inbound address, we create a case in your True Positive tenant and attach the original email.

## Set up an inbound address

To get started, visit Manage > Integrations.

![](https://storage.googleapis.com/tp_landing_page_videos/integrations_page.png)

Now, click "Create an inbound address".

![](https://storage.googleapis.com/tp_landing_page_videos/create_an_inbound_address_drawer.png)

Cases created from emails sent to your inbound address will be initialized with the case template you choose
and will be marked as created by the default creator you choose.

## Update an inbound address

Click an inbound address's title to open a drawer, like in the screenshot above, where you can update the inbound address.

## Delete an inbound address

Simply click the trash icon next to the appropriate inbound address in the screenshot above to delete it.
