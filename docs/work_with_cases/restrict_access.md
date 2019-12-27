---
id: restrict_access
title: Restrict Access
sidebar_label: Restrict Access
---

In addition to members of your security team, your company's IT staff, management, MSSPs, consultants, and many other individuals all may have access to your True Positive tenant.

However, you likely don't want to grant every user access to every case.

- You likely want to minimize the number of people with knowledge of ongoing insider threat investigations.
- Unnecessary personnel shouldn't have access to cases involving personal or sensitive data.
- By enforcing least privilege, you can limit the exposure if a True Positive user's account is compromised.

## Permission model

Cases in True Positive follow a simple permission model:

1. Only members of a case can access it
2. A member of a case can have a role of either "Can View" or "Can Edit" in the case

![](https://storage.googleapis.com/tp_landing_page_videos/case_members.png)

When a case is created, its creator is automatically added as a member with a "Can Edit" role. The case's creator can then add additional members.

## Manage members

To add a member to a case, remove a member from a case, or update an existing member's role, simply visit the "Members" tab (above).

Keep in mind that each case must have at least one "Can Edit" member, to avoid case lockouts.

This means you cannot remove a case's last "Can Edit" member or update his/her role to "Can View".
