---
id: overview
title: Overview
sidebar_label: Overview
---

A case represents an investigation in True Positive. For example, you may create cases for:

- Reverse engineering a piece of malware
- Triaging an IDS alert
- Hunting through web proxy logs
- Working on a large-scale data breach investigation

Each case has:

- A **status**, like "Open". True Positive ships with default statuses, but you can [customize the list of statuses](/docs/administer/customize_statuses_and_priorities) too.
- A **priority**, like "Critical". Just like with statuses, True Positive ships with some default priorities [you can customize](/docs/administer/customize_statuses_and_priorities).
- An **assignee**, or the user this case is assigned to. Can be empty.
- A **description**, which can be empty.
- **Tags**, which is just a list of strings (like "phishing" or "ransomware"). Can be empty.
