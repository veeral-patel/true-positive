---
title: Introducing True Positive
author: Veeral Patel
authorURL: https://twitter.com/veeralpatel44
authorTwitter: veeralpatel44
---

True Positive is a SaaS based case management tool for security teams that I've been working on for the last couple months. It's like
[TheHive Project](https://github.com/TheHive-Project/TheHive) or [RTIR](https://bestpractical.com/rtir), if you've heard of them.

## Working on a (failed) SOAR startup

My sophomore year of college two years ago, I read somewhere that the best startup ideas combine two things that you're good at. So I Googled for "security automation", and learned that this was a rapidly growing segment of the security industry!

Over the next year, I worked on a [SOAR](https://swimlane.com/solutions/security-automation-and-orchestration/) tool which never made it out of private beta. Initially I tried to clone Phantom and Demisto, and then I pivoted to a "case management" tool that let you run actions like looking up an IP in VirusTotal within the UI.

I didn't know anyone I could show my tool to, so I spent most of my time reading blog posts from competitors. My co-founder and I also interviewed twice, unsuccessfully, at YC.

## Noticing a gap in case management tools

I heard from several potential users during this time that they wanted a solid case management system before adopting any automation tools.

During my internship on Yelp's AppSec team last year, I noticed the team used Jira to track investigations of security alerts.

When I worked for Mandiant in SF as an incident response consultant (for the first couple months of 2019), I observed we were using HipChat and a Excel spreadsheet for each engagement. HipChat for posting findings and Excel for recording information about indicators, infected systems, malware samples, etc.

I read through each one of [TheHive's](https://github.com/TheHive-Project/TheHive) issues and saw that many of them were for simple features, like custom statuses, that hadn't implemented after months or years.

## Open sourcing INCIDENTS

After leaving Mandiant I released [INCIDENTS](https://github.com/veeral-patel/incidents). My insight was that incidents are trees of tickets, where some tickets are leads.

I personally emailed everyone who starred my repo and found a couple people who are happy to provide feedback. One person suggested I add autocomplete to tag inputs, which was extremely time-consuming for some reason in INCIDENTS's server-rendered UI, so I decided to develop a new version of the tool with React.

## Building True Positive

True Positive keeps the same concepts from INCIDENTS, but it features a much nicer UI, custom case statuses/priorities, the ability to restrict who can access a case, and the ability to make case members view only. The UI communicates with the server solely via a GraphQL API, which I'll be opening up shortly. True Positive also is SaaS-based and closed source.

True Positive is ready to use now. If you work on a security team or a SOC, you might find this tool helpful. Just fill out this [short form](https://veeral679649.typeform.com/to/tYdvLw) to request access, and I'll email you personally within 24 hours.

You can also email me at [veeral.patel@truepositive.app](mailto:veeral.patel@truepositive.app). I reply to every single email I get, usually within a couple hours.
