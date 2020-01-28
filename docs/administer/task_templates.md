---
id: task_templates
title: Task Templates
sidebar_label: Task Templates
---

You often do the same task in many different kinds of cases. For example:

- You collect the same initial forensic artifacts from your web server regardless of whether you suspect the attacker brute-forced a SSH password or exploited a vulnerability.

- You might block a domain in OpenDNS proactively, upon receiving threat intel, or to block C2 connections to it after an incident.

To model this, you can create task templates and then add a single task template to many different [case templates](/docs/administer/case_templates).

## Create a template

To create a new task template, visit `Manage > Integrations > Task Templates`:

![](https://storage.googleapis.com/tp_landing_page_videos/list_task_templates.png)

Then click "Create Template":

![](https://storage.googleapis.com/tp_landing_page_videos/create_task_template.png)

Now, provide a default name for tasks created from this template, and optionally, a default assignee and description.

## Update a template

To update a task template, click on the title of the template you'd like to update. This will open a drawer like this:

![](https://storage.googleapis.com/tp_landing_page_videos/update_task_template.png)

## Delete a template

To delete a task template, click the trash can icon next to the task template you'd like to delete.
