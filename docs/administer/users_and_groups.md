---
id: users_and_groups
title: Users & Groups
sidebar_label: Users & Groups
---

Visit Manage > Users and Groups before doing any of the steps below.

![](https://storage.googleapis.com/tp_landing_page_videos/manage_page2.png)

## Invite a user

To invite a user to your True Positive tenant, simply enter the new user's email address
in the input box above.

This will send an email to the new user with a link to log in to True Positive, a unique username,
and a long, random password. The user can update his username and password after logging in by visiting
his/her Profile page.

## Disable a user

For data integrity, True Positive does not let you delete users. You can , however, disable a user to prevent
him/her from logging in.

The UI will typically only list active users in input fields. However, the API makes no distinction between
active and disabled users: if you would like to assign a case to a disabled user (as an example), you can
do so in the API.

## Create a group

![](https://storage.googleapis.com/tp_landing_page_videos/list_of_groups.png)

We recommend organizing your users into groups. For example, your security division may be divided
into groups for AppSec,CorpSec, InfraSec, and Management. A user can be in multiple groups in True Positive.

Creating a group lets you add all the users in a group to a case at once. You can also add a group to a
case template, so that whenever a case is created from that template, all the users in the group will be
able to access the case.

To create a group, just enter the name of your group in the input box above. Then, click on the
name of your new group in the list to add users to it.

## Delete a group

To delete a group, click the trash can icon next to the appropriate group above.
