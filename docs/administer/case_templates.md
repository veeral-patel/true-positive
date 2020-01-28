---
id: case_templates
title: Case Templates
sidebar_label: Case Templates
---

Think about the last couple cases you worked on. Chances are, they fell into a couple major
categories: phishing, malware, IDS/SIEM alerts, etc.

And moreover, you probably followed a similar set of steps to resolve the cases of each category.

True Positive lets you define case templates for this very purpose, so that every case created from a
particular template:

- Is given an initial status, priority, assignee, description, and set of tags
- Is given a initial set of users and groups who can access it
- Is populated with a set of tasks for analysts to follow

## Create a template

To create a case template, visit `Manage > Templates > Case Templates`:

![](https://storage.googleapis.com/tp_landing_page_videos/list_of_case_templates.png)

Then, click `Create Template`.

This will open a drawer where you can choose the default name, status, priority,
assignee, tags, and description for cases created from this template:

![](https://storage.googleapis.com/tp_landing_page_videos/create_case_template.png)

Now, click the title of the case template you just created and follow the instructions below
to start adding tasks to it!

## Update a template

### Basic info

The Info tab lets you update basic info about the case template:

![](https://storage.googleapis.com/tp_landing_page_videos/update_case_template_basic_info.png)

### Tasks

Use the "Tasks" tab to populate cases created from your template with a set of tasks.

![](https://storage.googleapis.com/tp_landing_page_videos/update_case_template_tasks.png)

#### Create a task group

In True Positive, each task in a case are grouped into a [task group](/docs/work_with_casesTo/manage_tasks#task-groups).
Before you can add a task, you must create a task group.

Do this by clicking the "Create a task group" button in the screenshot above, which will open a modal like this:

![](https://storage.googleapis.com/tp_landing_page_videos/create_a_task_group_dos.png)

#### Add task templates

First, you must define [task templates](/docs/administer/task_templates) for each task you'd like to add.
This is so you can re-use a task in multiple case templates.

Then, simply select the task templates you'd like to add in the input box under the task group you'd like to them and click "Add".

### Users and groups

In True Positive, only certain users and groups are allowed to access each case.

## Create a case from a template

## Delete a template

To delete a case template, click the trash icon next to the case template you'd like
to delete.
