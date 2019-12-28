---
id: manage_indicators
title: Manage Indicators
sidebar_label: Manage Indicators
---

You can add indicators of compromise to cases in True Positive.

- If you're analyzing a phishing email, you probably want to capture the sender's email address and IP address.
- If you're examining a C2 connection, you probably want to record the C2 server's domain name.
- If a laptop is infected with ransomware, you probably want to log the file hash of the malware in question.

Note that True Positive only lets you add string indicators at the moment. In the future, we'll let you add text and
file indicators, too.

## Add indicators

Open the case, visit "Indicators", and enter your indicator in the input box:

![](https://storage.googleapis.com/tp_landing_page_videos/manage_indicators.png)

## Enrich an indicator

You probably don't just want to record the indicator itself, but also additional information about it.

You can do this by opening an indicator and giving it a human-friendly name, tagging it, and
adding a description and/or comments to it:

![](https://storage.googleapis.com/tp_landing_page_videos/gmail_indicator.png)

## Delete an indicator

To delete an indicator, open it, click Actions at the top (see the screenshot above), and click "Delete Indicator".
