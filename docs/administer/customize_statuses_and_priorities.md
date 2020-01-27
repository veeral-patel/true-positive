---
id: customize_statuses_and_priorities
title: Customize Statuses/Priorities
sidebar_label: Customize Statuses/Priorities
---

Every case in True Positive has a status and a priority.

## Default statuses/priorities

True Positive ships with these three statuses out of the box:

- Open
- In Progress
- Closed

And these three priorities:

- Low
- Medium
- High

## Customize statuses/priorities

That being said, you may want to customize the default statuses/priorities:

- For example, cases in your organization might follow this flow: `Unacknowledged` -> `Under Investigation` -> `Writing Report` -> `Closed`.
- Or you may want a `P0`/`P1`/`P2` priority scheme--or a scheme mapped to your org's risk management methodology.

To do this, visit `Manage > Customize Statuses` (or `Customize Priorities`). You can easily add/remove/rename
statuses/priorities on this page:

![](https://storage.googleapis.com/tp_landing_page_videos/customize_statuses.png)

## True Positive doesn't enforce transitions

Note, though, that True Positive, unlike Jira for example, knows nothing about the transitions between different statuses/priorities.

It doesn't enforce, for example, that a case which is `Unacknowledged` can only be changed to `Under Investigation`, and not to any other status.
